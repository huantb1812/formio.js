/* eslint-disable max-statements */
import _ from 'lodash';
import Field from '../_classes/field/Field';
import { boolValue } from '../../utils/utils';
import Formio from '../../Formio';
import NativePromise from 'native-promise-only';

export default class SurveyComponent extends Field {
  static schema(...extend) {
    return Field.schema({
      type: 'survey',
      label: 'Survey',
      key: 'survey',
      questions: [],
      values: []
    }, ...extend);
  }

  static get builderInfo() {
    console.log('builderInfo');
    return {
      title: 'Survey',
      group: 'advanced',
      icon: 'list',
      weight: 110,
      documentation: 'http://help.form.io/userguide/#survey',
      schema: SurveyComponent.schema()
    };
  }

  get defaultSchema() {
    console.log('defaultSchema');
    return SurveyComponent.schema();
  }
  init() {
    super.init();
    // this.itemsLoaded = new NativePromise((resolve) => {
    //   console.log('call itemsLoadedResolve', resolve);
    //   this.itemsLoadedResolve = resolve;
    // });
  }
  render() {
    console.log('render');
    return super.render(this.renderTemplate('survey'));
  }

  attach(element) {
    console.log('attach');
    this.loadRefs(element, { input: 'multiple' });
    const superAttach = super.attach(element);
    this.refs.input.forEach((input) => {
      if (this.disabled) {
        input.setAttribute('disabled', 'disabled');
      }
      else {
        this.addEventListener(input, 'change', () => this.updateValue(null, {
          modified: true
        }));
      }
    });
    this.setValue(this.dataValue);
    this.updateItems(true);
    return superAttach;
  }

  setValue(value, flags) {
    console.log('setValue');
    flags = flags || {};
    if (!value) {
      return false;
    }

    _.each(this.component.questions, (question) => {
      _.each(this.refs.input, (input) => {
        if (input.name === this.getInputName(question)) {
          input.checked = (input.value === value[question.value]);
        }
      });
    });
    return this.updateValue(value, flags);
  }

  get emptyValue() {
    return {};
  }

  getValue() {
    console.log('getValue');
    if (this.viewOnly || !this.refs.input || !this.refs.input.length) {
      return this.dataValue;
    }
    const value = {};
    _.each(this.component.questions, (question) => {
      _.each(this.refs.input, (input) => {
        if (input.checked && (input.name === this.getInputName(question))) {
          value[question.value] = input.value;
          return false;
        }
      });
    });
    return value;
  }

  set disabled(disabled) {
    super.disabled = disabled;
    _.each(this.refs.input, (input) => {
      input.disabled = true;
    });
  }

  get disabled() {
    return super.disabled;
  }

  validateRequired(setting, value) {
    if (!boolValue(setting)) {
      return true;
    }
    return this.component.questions.reduce((result, question) =>
      result && Boolean(value[question.value]), true);
  }

  getInputName(question) {
    console.log('getInputName');
    return `${this.options.name}[${question.value}]`;
  }

  updateItems(forceUpdate) {
    console.log('updateItems');
    switch (this.component.dataSrc) {
      case 'url': {
        if (!forceUpdate && !this.active) {
          // If we are lazyLoading, wait until activated.
          return;
        }
        let { url } = this.component.data;
        let method;
        let body;

        if (url.startsWith('/')) {
          // if URL starts with '/project', we should use base URL to avoid issues with URL formed like <base_url>/<project_name>/project/<project_id>/...
          const baseUrl = url.startsWith('/project') ? Formio.getBaseUrl() : Formio.getProjectUrl() || Formio.getBaseUrl();
          url = baseUrl + url;
        }

        if (!this.component.data.method) {
          method = 'GET';
        }
        else {
          method = this.component.data.method;
          if (method.toUpperCase() === 'POST') {
            body = this.component.data.body;
          }
          else {
            body = null;
          }
        }
        const options = this.component.authenticate ? {} : { noToken: true };
        this.loadItems(url, this.requestHeaders, options, method, body);
        break;
      }
    }
  }

  loadItems(url, headers, options, method, body) {
    console.log('loadItems', url, headers, options, method, body);
    options = options || {};

    // See if they have not met the minimum search requirements.
    const minSearch = parseInt(this.component.minSearch, 10);
    if (
      this.component.searchField &&
      (minSearch > 0)
    ) {
      // Set empty items.
      return this.setItems([]);
    }

    // Ensure we have a method and remove any body if method is get
    method = method || 'GET';
    if (method.toUpperCase() === 'GET') {
      body = null;
    }

    const limit = this.component.limit || 9999;
    const skip = this.isScrollLoading ? this.selectOptions.length : 0;
    const query = (this.component.dataSrc === 'url') ? {} : {
      limit,
      skip,
    };

    // Allow for url interpolation.
    url = this.interpolate(url, {
      formioBase: Formio.getBaseUrl(),
      limit,
      skip,
      page: Math.abs(Math.floor(skip / limit))
    });

    // If they wish to return only some fields.
    if (this.component.selectFields) {
      query.select = this.component.selectFields;
    }

    // Add sort capability
    if (this.component.sort) {
      query.sort = this.component.sort;
    }

    if (!_.isEmpty(query)) {
      // Add the query string.
      url += (!url.includes('?') ? '?' : '&') + Formio.serialize(query, (item) => this.interpolate(item));
    }

    // Add filter capability
    if (this.component.filter) {
      url += (!url.includes('?') ? '?' : '&') + this.interpolate(this.component.filter);
    }

    // Make the request.
    options.header = headers;
    this.loading = true;

    Formio.makeRequest(this.options.formio, 'select', url, method, body, options)
      .then((response) => {
        this.loading = false;
        this.setItems(response);
      })
      .catch((err) => {
        if (this.isInfiniteScrollProvided) {
          this.setItems([]);
        }

        this.isScrollLoading = false;
        this.loading = false;
        // this.itemsLoadedResolve();
        this.emit('componentError', {
          component: this.component,
          message: err.toString(),
        });
        console.warn(`Unable to load resources for ${this.key}`);
      });
  }

  /* eslint-disable max-statements */
  setItems(items) {
    // If the items is a string, then parse as JSON.
    console.log('setItems');
    if (typeof items == 'string') {
      try {
        items = JSON.parse(items);
      }
      catch (err) {
        console.warn(err.message);
        items = [];
      }
    }
    const questions = [];
    const values = [{ label: 'yes', id: 'yes' }, { label: 'no', id: 'no' }];
    for (let i = 0; i < 10; i++) {
      const q = items[i];
      questions.push({ label: q.title, value: q.id });
    }

    this.component.questions = questions;
    this.component.values = values;
    this.setValue(this.dataValue);
    this.render();
  }
}
