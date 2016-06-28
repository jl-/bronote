import marked from 'marked';
import hljs from 'highlight.js';
hljs.configure({
  tabReplace: '  '
});
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
  highlight: code => hljs.highlightAuto(code).value
});

/* eslint no-undef: 0 */
onmessage = ({ data }) => {
  const parsed = marked(data);
  postMessage(parsed);
};

