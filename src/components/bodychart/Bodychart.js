import _ from 'lodash';
import Field from '../_classes/field/Field';

export default class BodychartComponent extends Field {
  static schema(...extend) {
    return Field.schema({
      type: 'bodychart',
      inputType: 'bodychart',
      label: 'Bodychart',
      key: 'bodychart',
      values: [{ label: '', value: '' }],
      fieldSet: false
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Bodychart',
      group: 'basic',
      icon: 'dot-circle-o',
      weight: 80,
      documentation: 'http://help.form.io/userguide/#bodychart',
      schema: BodychartComponent.schema()
    };
  }

  constructor(component, options, data) {
    super(component, options, data);
    this.previousValue = this.dataValue || null;
  }

  get defaultSchema() {
    return BodychartComponent.schema();
  }

  get inputInfo() {
    const info = super.elementInfo();
    info.type = 'input';
    info.changeEvent = 'click';
    info.attr.class = 'form-check-input';
    info.attr.name = info.attr.name += `[${this.id}]`;
    return info;
  }

  get emptyValue() {
    return '';
  }

  get isBodychart() {
    return this.component.inputType === 'bodychart';
  }

  render() {
    return super.render(this.renderTemplate('bodychart', {
      input: this.inputInfo,
      inline: this.component.inline,
      values: this.component.values,
      value: this.dataValue,
      row: this.row,
    }));
  }

  attach(element) {
    this.loadRefs(element, { input: 'multiple', wrapper: 'multiple' });
    this.refs.input.forEach((input, index) => {
      this.addEventListener(input, this.inputInfo.changeEvent, () => this.updateValue(null, {
        modified: true,
      }));
      this.addShortcut(input, this.component.values[index].shortcut);

      if (this.isBodychart) {
        input.checked = (this.dataValue === input.value);
        this.addEventListener(input, 'keyup', (event) => {
          if (event.key === ' ' && this.dataValue === input.value) {
            event.preventDefault();

            this.updateValue(null, {
              modified: true,
            });
          }
        });
      }
    });
    return super.attach(element);
  }

  detach(element) {
    if (element && this.refs.input) {
      this.refs.input.forEach((input, index) => {
        this.removeShortcut(input, this.component.values[index].shortcut);
      });
    }
  }

  getValue() {
    if (this.viewOnly || !this.refs.input || !this.refs.input.length) {
      return this.dataValue;
    }
    let value = this.dataValue;
    this.refs.input.forEach((input) => {
      if (input.checked) {
        value = input.value;
      }
    });
    return value;
  }

  getValueAsString(value) {
    if (!value) {
      return '';
    }
    if (!_.isString(value)) {
      return _.toString(value);
    }

    const option = _.find(this.component.values, (v) => v.value === value);

    return _.get(option, 'label', '');
  }

  setValueAt(index, value) {
    if (this.refs.input && this.refs.input[index] && value !== null && value !== undefined) {
      const inputValue = this.refs.input[index].value;
      this.refs.input[index].checked = (inputValue === value.toString());
    }
  }

  updateValue(value, flags) {
    const changed = super.updateValue(value, flags);
    if (changed && this.refs.wrapper) {
      //add/remove selected option class
      const value = this.dataValue;
      const optionSelectedClass = 'bodychart-selected';

      this.refs.wrapper.forEach((wrapper, index) => {
        const input = this.refs.input[index];
        if (input && input.value.toString() === value.toString()) {
          //add class to container when selected
          this.addClass(wrapper, optionSelectedClass);
        }
        else {
          this.removeClass(wrapper, optionSelectedClass);
        }
      });
    }

    if (!flags || !flags.modified || !this.isBodychart) {
      return changed;
    }

    // If they clicked on the bodychart that is currently selected, it needs to reset the value.
    this.currentValue = this.dataValue;
    const shouldResetValue = !(flags && flags.noUpdateEvent)
      && this.previousValue === this.currentValue;
    if (shouldResetValue) {
      this.resetValue();
      this.triggerChange();
    }
    this.previousValue = this.dataValue;
    return changed;
  }

  /**
   * Normalize values coming into updateValue.
   *
   * @param value
   * @return {*}
   */
  normalizeValue(value) {
    const dataType = _.get(this.component, 'dataType', 'auto');
    switch (dataType) {
      case 'auto':
        if (!isNaN(parseFloat(value)) && isFinite(value)) {
          value = +value;
        }
        if (value === 'true') {
          value = true;
        }
        if (value === 'false') {
          value = false;
        }
        break;
      case 'number':
        value = +value;
        break;
      case 'string':
        if (typeof value === 'object') {
          value = JSON.stringify(value);
        }
        else {
          value = value.toString();
        }
        break;
      case 'boolean':
        value = !(!value || value.toString() === 'false');
        break;
    }
    return super.normalizeValue(value);
  }
}
