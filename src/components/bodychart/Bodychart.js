import _ from 'lodash';
import Input from '../_classes/input/Input';
import Choices from 'choices.js';

// import $ from 'jquery';
// import HumanMapjs from './human-map';
// import imagemapster from '../../utils/JqueryImagemapsterWrapper';
// import Field from '../_classes/field/Field';
// import Formio from '../../Formio';
// import NativePromise from 'native-promise-only';
// const Imgmapster = 'https://raw.githubusercontent.com/jamietre/ImageMapster/e08cd7ec24ffa9e6cbe628a98e8f14cac226a258/dist/jquery.imagemapster.min.js';

export default class BodychartComponent extends Input {
  static schema(...extend) {
    return Input.schema({
      // type: 'bodychart',
      // inputType: 'bodychart',
      // label: 'Bodychart',
      // key: 'bodychart',
      // values: [{ label: '', value: '' }],
      // fieldSet: false

      type: 'bodychart',
      label: 'Bodychart',
      key: 'bodychart',
      delimeter: ',',
      storeas: 'string',
      maxTags: 0
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Bodychart',
      group: 'basic',
      icon: 'male',
      weight: 30,
      documentation: 'http://help.form.io/userguide/#bodychart',
      schema: BodychartComponent.schema()
    };
  }

  init() {
    super.init();
  }
  // constructor(component, options, data) {
  //   super(component, options, data);
  //   this.previousValue = this.dataValue || null;
  // }
  // get emptyValue() {
  //   return '';
  // }

  get emptyValue() {
    return (this.component.storeas === 'string') ? '' : [];
  }

  get defaultSchema() {
    return BodychartComponent.schema();
  }

  // get inputInfo() {
  //   const info = super.elementInfo();
  //   info.type = 'input';
  //   info.changeEvent = 'click';
  //   info.attr.class = 'form-check-input';
  //   info.attr.name = info.attr.name += `[${this.id}]`;
  //   return info;
  // }

  get inputInfo() {
    const info = super.inputInfo;
    info.type = 'input';
    info.attr.type = 'text';
    info.changeEvent = 'change';
    return info;
  }

  get delimiter() {
    return this.component.delimeter || ',';
  }

  attachElement(element, index) {
    super.attachElement(element, index);
    if (!element) {
      return;
    }
    element.setAttribute('dir', this.i18next.dir());
    if (this.choices) {
      this.choices.destroy();
    }
    this.choices = new Choices(element, {
      delimiter: this.delimiter,
      editItems: true,
      maxItemCount: this.component.maxTags,
      removeItemButton: true,
      duplicateItemsAllowed: false,
    });
    this.choices.itemList.element.tabIndex = element.tabIndex;
    this.addEventListener(this.choices.input.element, 'blur', () => {
      const value = this.choices.input.value;
      if (value) {
        this.choices.setValue([value]);
        this.choices.clearInput();
        this.choices.hideDropdown(true);
        this.updateValue(null, {
          modified: true
        });
      }
    });
  }

  detach() {
    super.detach();
    if (this.choices) {
      this.choices.destroy();
      this.choices = null;
    }
  }

  normalizeValue(value) {
    if (this.component.storeas === 'string' && Array.isArray(value)) {
      return value.join(this.delimiter);
    }
    else if (this.component.storeas === 'array' && typeof value === 'string') {
      return value.split(this.delimiter).filter(result => result);
    }
    return value;
  }

  setValue(value) {
    const changed = super.setValue(value);
    if (this.choices) {
      let dataValue = this.dataValue;
      this.choices.removeActiveItems();
      if (dataValue) {
        if (typeof dataValue === 'string') {
          dataValue = dataValue.split(this.delimiter).filter(result => result);
        }
        this.choices.setValue(Array.isArray(dataValue) ? dataValue : [dataValue]);
      }
    }
    return changed;
  }

  set disabled(disabled) {
    super.disabled = disabled;
    if (!this.choices) {
      return;
    }
    if (disabled) {
      this.choices.disable();
    }
    else {
      this.choices.enable();
    }
  }

  get disabled() {
    return super.disabled;
  }

  focus() {
    if (this.refs.input && this.refs.input.length) {
      this.refs.input[0].parentNode.lastChild.focus();
    }
  }

  // get isBodychart() {
  //   return this.component.inputType === 'bodychart';
  // }

  // render() {
  //   console.log('render');
  //   var t = super.render(this.renderTemplate('bodychart', {
  //     input: this.inputInfo,
  //     inline: this.component.inline,
  //     values: this.component.values,
  //     value: this.dataValue,
  //     row: this.row,
  //   }));
  //   return t;
  // }

  // attach(element) {
  //   console.log('attach');
  //   this.loadRefs(element, { input: 'multiple', wrapper: 'multiple' });
  //   if (element.id) {
  //     var humanmap = $(`#${element.id} .map`);
  //     //update
  //     humanmap.render('huan');
  //     // var options = {
  //     //   fillColor: 'ff0000',
  //     //   stroke: true,
  //     //   singleSelect: true,
  //     //   fillOpacity: 0.2,
  //     //   mapKey: 'data-state',
  //     //   onClick: (e) => {
  //     //     //hidden all item
  //     //     document.querySelectorAll(`${this.statelistSelector} .item`).forEach(option => {
  //     //       option.classList.add('visibility');
  //     //     });
  //     //     document.querySelectorAll(`${this.statelistSelector} .item.${e.key.toLowerCase()}`).forEach(option => {
  //     //       option.classList.remove('visibility');
  //     //       option.addEventListener('click', () => {
  //     //         const currentActived = document.querySelector(`${this.statelistSelector} .item.actived`);
  //     //         if (currentActived) {
  //     //           currentActived.classList.remove('actived');
  //     //         }
  //     //         setTimeout(() => {
  //     //           option.classList.add('actived');
  //     //           const key = option.querySelector('input').value;
  //     //           this.showMenuChild(key);
  //     //         }, 100);
  //     //       });
  //     //     });

  //     //     document.querySelectorAll(`${this.conditionsSelector} .item`).forEach(option => {
  //     //       option.classList.add('visibility');
  //     //     });
  //     //   },
  //     // };
  //     // Formio.requireLibrary('map', 'ClassicEditor', _.get(this.options, 'editors.ckeditor.src', Imgmapster), true)
  //     //   .then(() => {
  //     //     if (!element.parentNode) {
  //     //       return NativePromise.reject();
  //     //     }
  //     //     console.log(element);
  //     //     // return ClassicEditor.create(element, settings).then(editor => {
  //     //     //   editor.model.document.on('change', () => onChange(editor.data.get()));
  //     //     //   return editor;
  //     //     // });
  //     //   });

  //     // $(`#${element.id} .map`).mapster(options);

  //     $(`#${element.id} .item`).click({ element }, (e) => {
  //       var result = {
  //         statelist: '',
  //         conditions: ''
  //       };
  //       var scopeId = e.data.element.id;
  //       console.log('click', scopeId, e.target.innerText);

  //       // click statelist item
  //       if (e.target.parentElement.classList.contains('statelist')) {
  //         e.target.parentElement.children.forEach(stateitem => {
  //           if (stateitem.classList.contains('actived')) {
  //             stateitem.classList.remove('actived');
  //           }
  //         });
  //         e.target.classList.add('actived');
  //         var currentCondition = $(`#${scopeId} .conditions .item.actived`);
  //         if (currentCondition && currentCondition.length > 0) {
  //           currentCondition[0].classList.remove('actived');
  //         }

  //         //filter conditions by statelist
  //         var conditions = $(`#${scopeId} .conditions`);
  //         conditions[0].children.forEach(condition => {
  //           condition.classList.add('visibility');
  //         });

  //         var currentConditionOfStatelist = $(`#${scopeId} .conditions .item.${e.target.innerText.toLowerCase()}`);
  //         for (let i = 0; i < currentConditionOfStatelist.length; i++) {
  //           currentConditionOfStatelist[i].classList.remove('visibility');
  //         }
  //       }

  //       // click statelist item
  //       else if (e.target.parentElement.classList.contains('conditions')) {
  //         e.target.parentElement.children.forEach(stateitem => {
  //           if (stateitem.classList.contains('actived')) {
  //             stateitem.classList.remove('actived');
  //           }
  //         });
  //         e.target.classList.add('actived');
  //       }

  //       var statelistActived = $(`#${scopeId} .statelist .item.actived`);
  //       if (statelistActived && statelistActived.length > 0) {
  //         result.statelist = statelistActived[0].innerText;
  //       }

  //       var conditionActived = $(`#${scopeId} .conditions .item.actived`);
  //       if (conditionActived && conditionActived.length > 0) {
  //         result.conditions = conditionActived[0].innerText;
  //       }
  //       this.updateValue(result, {
  //         modified: true,
  //       });
  //     });
  //   }
  //   return super.attach(element);
  // }

  // detach(element) {
  //   console.log('detach');
  //   if (element && this.refs.input) {
  //     this.refs.input.forEach((input, index) => {
  //       this.removeShortcut(input, this.component.values[index].shortcut);
  //     });
  //   }
  // }

  // getValue() {
  //   console.log('getValue');
  //   if (this.viewOnly || !this.refs.input || !this.refs.input.length) {
  //     return this.dataValue;
  //   }
  //   let value = this.dataValue;
  //   this.refs.input.forEach((input) => {
  //     if (input.checked) {
  //       value = input.value;
  //     }
  //   });
  //   return value;
  // }

  // getValueAsString(value) {
  //   console.log('getValueAsString');

  //   if (!value) {
  //     return '';
  //   }
  //   if (!_.isString(value)) {
  //     return _.toString(value);
  //   }

  //   const option = _.find(this.component.values, (v) => v.value === value);

  //   return _.get(option, 'label', '');
  // }

  // setValueAt(index, value) {
  //   console.log('setValueAt', index, value);
  //   if (this.refs.input && this.refs.input[index] && value !== null && value !== undefined) {
  //     const inputValue = this.refs.input[index].value;
  //     this.refs.input[index].checked = (inputValue === value.toString());
  //   }
  // }

  // updateValue(value, flags) {
  //   console.log('updateValue');

  //   const changed = super.updateValue(value, flags);
  //   if (changed && this.refs.wrapper) {
  //     //add/remove selected option class
  //     const value = this.dataValue;
  //     const optionSelectedClass = 'bodychart-selected';

  //     this.refs.wrapper.forEach((wrapper, index) => {
  //       const input = this.refs.input[index];
  //       if (input && input.value.toString() === value.toString()) {
  //         //add class to container when selected
  //         this.addClass(wrapper, optionSelectedClass);
  //       }
  //       else {
  //         this.removeClass(wrapper, optionSelectedClass);
  //       }
  //     });
  //   }

  //   if (!flags || !flags.modified || !this.isBodychart) {
  //     return changed;
  //   }

  //   // If they clicked on the bodychart that is currently selected, it needs to reset the value.
  //   this.currentValue = this.dataValue;
  //   const shouldResetValue = !(flags && flags.noUpdateEvent)
  //     && this.previousValue === this.currentValue;
  //   if (shouldResetValue) {
  //     this.resetValue();
  //     this.triggerChange();
  //   }
  //   this.previousValue = this.dataValue;
  //   return changed;
  // }

  // /**
  //  * Normalize values coming into updateValue.
  //  *
  //  * @param value
  //  * @return {*}
  //  */
  // normalizeValue(value) {
  //   console.log('normalizeValue');

  //   const dataType = _.get(this.component, 'dataType', 'auto');
  //   switch (dataType) {
  //     case 'auto':
  //       if (!isNaN(parseFloat(value)) && isFinite(value)) {
  //         value = +value;
  //       }
  //       if (value === 'true') {
  //         value = true;
  //       }
  //       if (value === 'false') {
  //         value = false;
  //       }
  //       break;
  //     case 'number':
  //       value = +value;
  //       break;
  //     case 'string':
  //       if (typeof value === 'object') {
  //         value = JSON.stringify(value);
  //       }
  //       else {
  //         value = value.toString();
  //       }
  //       break;
  //     case 'boolean':
  //       value = !(!value || value.toString() === 'false');
  //       break;
  //   }
  //   return super.normalizeValue(value);
  // }
}
