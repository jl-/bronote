/**
 * import Toasty from 'pathtocomponent/toasty';
 * Toasty.warn({ content: 'Boom!' });
 *
 *
 *
 */
import Toasty from './toasty';
import TOAST_TYPES from './types';

let toasty = null;
const TOASTY_CONFIG = {
  enterTimeout: 400,
  duration: 4000 // default duration
};

function getToastyInstance(config = TOASTY_CONFIG) {
  if (toasty) return toasty;
  toasty = Toasty.newInstance(config);
  return toasty;
}

const add = (props) => getToastyInstance().add({ type: TOAST_TYPES.INFO, ...props });
const remove = (key) => getToastyInstance().remove(key);
const destroy = () => {
  if (toasty) {
    toasty.destroy();
    toasty = null;
  }
};

const info  = (props) => add({ ...props, type: TOAST_TYPES.INFO });
const warn  = (props) => add({ ...props, type: TOAST_TYPES.WARNING });
const error = (props) => add({ ...props, type: TOAST_TYPES.ERROR });

const api = { add, remove, destroy, info, warn, error };
export default api;
