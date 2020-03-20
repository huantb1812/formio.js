import $ from 'jquery';
import Jqueryimagemapster from 'jquery-imagemapster';

// jQuery.fn.extend({
//   mapster: (data) => {
//     jQuery('.map').mapster();
//   },
// });
class JqueryimagemapsterWrapper extends Jqueryimagemapster {
  constructor(...args) {
    super(...args);
  }
}

export default JqueryimagemapsterWrapper;
