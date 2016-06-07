import electron from'electron';
const { protocol } = electron;

function fileProtocolHandler(req, callback) {
  const url = req.url.substr(7);
  console.log(req.url, url, path.normalize(url));
  callback({path: './' + path.normalize(url)})
}

export default function init() {
  protocol.interceptFileProtocol('file', fileProtocolHandler);
}
