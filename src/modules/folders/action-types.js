import uid from 'utils/lib/uid';
import ktv from 'utils/lib/ktv';

const ACTIONS = [
  'PICK_FOLDER',
  'PICK_FOLDER_OK',
  'PICK_FOLDER_FAILED'
];
export default ktv(ACTIONS, uid);
