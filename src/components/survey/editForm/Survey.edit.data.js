export default [
  {
    key: 'multiple',
    ignore: true
  },
  {
    type: 'select',
    input: true,
    weight: 0,
    tooltip: 'The source to use for the select data. Values lets you provide your own values and labels. JSON lets you provide raw JSON data. URL lets you provide a URL to retrieve the JSON data from.',
    key: 'dataSrc',
    defaultValue: 'values',
    label: 'Data Source Type',
    dataSrc: 'values',
    data: {
      values: [
        { label: 'Values', value: 'values' },
        { label: 'URL', value: 'url' },
        { label: 'Resource', value: 'resource' },
        { label: 'Custom', value: 'custom' },
        { label: 'Raw JSON', value: 'json' },
        { label: 'IndexedDB', value: 'indexeddb' },
      ],
    },
  },
  {
    type: 'textfield',
    input: true,
    key: 'data.url',
    weight: 10,
    label: 'Data Source URL',
    placeholder: 'Data Source URL',
    tooltip: 'A URL that returns a JSON array to use as the data source.',
    conditional: {
      json: { '===': [{ var: 'data.dataSrc' }, 'url'] },
    },
  },
  {
    type: 'textarea',
    input: true,
    key: 'template',
    label: 'Item Template',
    editor: 'ace',
    as: 'html',
    rows: 3,
    weight: 18,
    tooltip: 'The HTML template for the result data items.',
    allowCalculateOverride: true,
    calculateValue: (context) => {
      if (!context.data.template) {
        if (context.instance && context.instance._currentForm.options.editComponent) {
          return context.instance._currentForm.options.editComponent.template;
        }
      }

      return context.data.template;
    }
  },
  {
    type: 'textarea',
    as: 'json',
    editor: 'ace',
    weight: 28,
    input: true,
    key: 'customOptions',
    label: 'Choices.js options',
    tooltip: 'A raw JSON object to use as options for the Select component (Choices JS).',
    defaultValue: {},
  },
  {
    type: 'datagrid',
    input: true,
    label: 'Questions',
    key: 'questions',
    tooltip: 'The questions you would like to ask in this survey question.',
    weight: 0,
    reorder: true,
    defaultValue: [{ label: '', value: '' }],
    components: [
      {
        label: 'Label',
        key: 'label',
        input: true,
        type: 'textfield'
      },
      {
        label: 'Value',
        key: 'value',
        input: true,
        type: 'textfield',
        allowCalculateOverride: true,
        calculateValue: { _camelCase: [{ var: 'row.label' }] }
      }
    ],
    conditional: {
      json: { '!==': [{ var: 'data.dataSrc' }, 'url'] },
    },
  },
  {
    type: 'datagrid',
    input: true,
    label: 'Values',
    key: 'values',
    tooltip: 'The values that can be selected per question. Example: \'Satisfied\', \'Very Satisfied\', etc.',
    weight: 1,
    reorder: true,
    defaultValue: [{ label: '', value: '' }],
    components: [
      {
        label: 'Label',
        key: 'label',
        input: true,
        type: 'textfield'
      },
      {
        label: 'Value',
        key: 'value',
        input: true,
        type: 'textfield',
        allowCalculateOverride: true,
        calculateValue: { _camelCase: [{ var: 'row.label' }] }
      }
    ],
    conditional: {
      json: { '!==': [{ var: 'data.dataSrc' }, 'url'] },
    },
  }
];
