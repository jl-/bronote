import utpl from 'url-template';
export default function templatifyURL(tpl) {
  return { TPL: tpl, expand: utpl.parse(tpl).expand };
}

