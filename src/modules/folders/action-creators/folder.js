import electron from 'electron';
import { CHANNELS } from 'configs/app';
const { ipcRenderer } = electron;

export function pickFolder(callback) {
  return () => {
    ipcRenderer.send(CHANNELS.PICK_FOLDER, true, {});
    ipcRenderer.once(CHANNELS.PICK_FOLDER_OK, (event, ...res) => {
      callback(...res);
    });
  };
}
