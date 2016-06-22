import electron from 'electron';
import path from 'path';
const { protocol } = electron;

function fileProtocolHandler(req, callback) {
  const url = req.url.substr(7);
  callback({ path: './' + path.normalize(url) })
}

export default function init() {
  protocol.interceptFileProtocol('file', fileProtocolHandler);
}
