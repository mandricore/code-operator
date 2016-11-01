import { decorate } from 'core-decorators'
import { memoize } from 'lodash'

class CodeOperator {
  constructor(opts = {}) {
    this.opts = opts;
  }

  @decorate(memoize)
  delete(a) {
    return a + 1; 
  }
}

module.exports = () => {
  return new CodeOperator(opts);
}