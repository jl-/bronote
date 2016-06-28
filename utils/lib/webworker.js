export default function createWorker(callback) {
  const response = `onmessage=function(event){postMessage(marked(event.data));}`;
  const blob = new Blob([response], { type: 'application/javascript' });
  const worker = new Worker(URL.createObjectURL(blob));
  return {
    execute(...args) {
      return new Promise((resolve, reject) => {
        worker.postMessage.apply(worker, args);
        worker.onmessage = ({ data }) => {
          resolve(data);
        };
        worker.onerror = (e) => {
          reject(e);
        };
      });
    }
  };
}

