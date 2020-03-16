import baseEditForm from '../_classes/component/Component.form';

import BodychartEditData from './editForm/Bodychart.edit.data';
import BodychartEditDisplay from './editForm/Bodychart.edit.display';
import BodychartEditValidation from './editForm/Bodychart.edit.validation';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'display',
      components: BodychartEditDisplay
    },
    {
      key: 'data',
      components: BodychartEditData
    },
    // {
    //   key: 'validation',
    //   components: BodychartEditValidation
    // },
  ], ...extend);
}
