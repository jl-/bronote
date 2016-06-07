import Locale from '../Locale';

const zh = new Locale();

zh.set('terms', {
  create: '创建'
}).set('app.sections', {
}).set('errors', {
});

export const kvs = zh.flatten();

export default zh;
