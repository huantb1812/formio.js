import jQuery from 'jquery';
import Jqueryimagemapster from 'jquery-imagemapster';

/**
 * TODO: REMOVE THIS ONCE THE PULL REQUEST HAS BEEN RESOLVED.
 *
 * https://github.com/jshjohnson/Choices/pull/788
 *
 * This is intentionally not part of the extended class, since other components use Choices and need this fix as well.
 * @type {Choices._generatePlaceholderValue}
 * @private
 */
export const KEY_CODES = {
  BACK_KEY: 46,
  DELETE_KEY: 8,
  TAB_KEY: 9,
  ENTER_KEY: 13,
  A_KEY: 65,
  ESC_KEY: 27,
  UP_KEY: 38,
  DOWN_KEY: 40,
  PAGE_UP_KEY: 33,
  PAGE_DOWN_KEY: 34,
};
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
