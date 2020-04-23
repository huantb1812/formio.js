/* eslint-disable max-statements */
import _ from 'lodash';
import Field from '../_classes/field/Field';
import { boolValue } from '../../utils/utils';
import Formio from '../../Formio';
import NativePromise from 'native-promise-only';

export default class SurveyComponent extends Field {
  idx = 0;
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
    console.log('Survey ', this.id, this.idx++);
    return SurveyComponent.schema();
  }

  init() {
    console.log('Survey ', this.id, this.idx++);
    super.init();
    // this.itemsLoaded = new NativePromise((resolve) => {
    //   console.log('call itemsLoadedResolve', resolve);
    //   this.itemsLoadedResolve = resolve;
    // });
    this.itemsLoaded = new NativePromise((resolve) => {
      this.itemsLoadedResolve = resolve;
    });
  }

  get dataReady() {
    return this.itemsLoaded;
  }

  render() {
    console.log('Survey ', this.id, this.idx++);
    var survey = this.renderTemplate('survey');
    var result = super.render(survey);
    return result;
  }

  attach(element, recall = false) {
    console.log('Survey ', this.id, this.idx++);
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
    if (this.component.dataSrc === 'url' && recall === false) {
      this.updateItems(element);
    }
    return superAttach;
  }

  setValue(value, flags) {
    console.log('Survey ', this.id, this.idx++);
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
    console.log('Survey ', this.id, this.idx++);
    return {};
  }

  getValue() {
    console.log('Survey ', this.id, this.idx++);
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
    console.log('Survey ', this.id, this.idx++);
    super.disabled = disabled;
    _.each(this.refs.input, (input) => {
      input.disabled = true;
    });
  }

  get disabled() {
    console.log('Survey ', this.id, this.idx++);
    return super.disabled;
  }

  validateRequired(setting, value) {
    console.log('Survey ', this.id, this.idx++);
    if (!boolValue(setting)) {
      return true;
    }
    return this.component.questions.reduce((result, question) =>
      result && Boolean(value[question.value]), true);
  }

  getInputName(question) {
    console.log('Survey ', this.id, this.idx++);
    return `${this.options.name}[${question.value}]`;
  }

  updateItems(element) {
    console.log('Survey ', this.id, this.idx++);
    let { url } = this.component.data;
    let method;
    let body;

    if (url.startsWith('/')) {
      // if URL starts with '/project', we should use base URL to avoid issues with URL formed like <base_url>/<project_name>/project/<project_id>/...
      const baseUrl = url.startsWith('/project') ? Formio.getBaseUrl() : Formio.getProjectUrl() || Formio.getBaseUrl();
      url = baseUrl + url;
    }

    if (url && url !== '') {
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
      this.loadItems(url, this.requestHeaders, options, method, body, element);
    }
  }

  loadItems(url, headers, options, method, body, element) {
    console.log('Survey ', this.id, this.idx++);
    options = options || {};

    // Ensure we have a method and remove any body if method is get
    method = method || 'GET';
    if (method.toUpperCase() === 'GET') {
      body = null;
    }
    //hard code
    const limit = 10;
    const skip = 0;
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
        this.setItems(response, element);
      })
      .catch((err) => {
        this.setItems([], element);
        this.loading = false;
        this.emit('componentError', {
          component: this.component,
          message: err.toString(),
        });
        console.warn(`Unable to load resources for ${this.key}`);
      });
  }

  /* eslint-disable max-statements */
  setItems(items, element) {
    // If the items is a string, then parse as JSON.
    console.log('Survey ', this.id, this.idx++);
    if (typeof items == 'string') {
      try {
        items = JSON.parse(items);
      }
      catch (err) {
        console.warn(err.message);
        items = [];
      }
    }
    //hard code
    const questions = [];
    const values = [{ label: 'yes', id: 'yes' }, { label: 'no', id: 'no' }];

    for (let i = 0; i < 10; i++) {
      questions.push({ label: `title ${i}`, value: `title ${i}` });
    }

    this.component.questions = questions;
    this.component.values = values;
    // var survey = this.renderTemplate('survey');
    console.log('setItems');
    this.render();
    // this.setValue(this.dataValue);
    // this.render();
    // this.attach(element, true);
  }
}
