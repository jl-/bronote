import Parser from 'worker!./worker';
const parser = new Parser();

export default function parse(content) {
  return new Promise((resolve, reject) => {
    parser.onmessage = ({ data }) => {
      resolve(data);
    };
    parser.onerror = (e) => {
      reject(e);
    };
    parser.postMessage(content);
  });
}
