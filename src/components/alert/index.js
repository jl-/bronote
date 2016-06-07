import Alert from './alert';
import TYPES from './types';

let instance = null;
const ALERT_CONFIG = {
  rootClassName: ''
};

function getAlertInstance() {
  if (instance) return instance;
  instance = Alert.newInstance(ALERT_CONFIG);
  return instance;
}

const show    = (props) => getAlertInstance().show(props);
const hide    = (props) => getAlertInstance().toggle(true);
const destroy = () => {
  if (instance) {
    instance.destroy();
    instance = null;
  }
};

const info    = (props) => show({ ...props, type: TYPES.INFO });
const success = (props) => show({ ...props, type: TYPES.SUCCESS });
const warn    = (props) => show({ ...props, type: TYPES.WARNING });
const error   = (props) => show({ ...props, type: TYPES.ERROR });

const api = { show, hide, destroy, info, success, warn, error };
export default api;
