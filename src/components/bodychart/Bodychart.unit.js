import assert from 'power-assert';

import Harness from '../../../test/harness';
import BodychartComponent from './Bodychart';

import {
  comp1
} from './fixtures';

describe('Bodychart Component', () => {
  it('Should build a bodychart component', () => {
    return Harness.testCreate(BodychartComponent, comp1).then((component) => {
      Harness.testElements(component, 'input[type="bodychart"]', 4);
      Harness.testElements(component, 'span', 4);
    });
  });

  it('Span should have correct text label', () => {
    return Harness.testCreate(BodychartComponent, comp1).then((component) => {
      component.element.querySelectorAll('input').forEach((input) => {
        assert(input.getAttribute('class').indexOf('form-check-input') !== -1, 'No form-check-input on bodycharts.');
      });
      const spans = component.element.querySelectorAll('span');
      assert.equal(spans[0].innerHTML, 'Red');
      assert.equal(spans[1].innerHTML, 'Green');
      assert.equal(spans[2].innerHTML, 'Blue');
      assert.equal(spans[3].innerHTML, 'Yellow');
    });
  });
});
