import _validator from 'validator';

const validator = Object.create(_validator);
validator.extend = function(name, fn) {
  this[name] = function(...args) {
    args[0] = this.toString(args[0]);
    return fn.apply(this, args);
  }
};

// ///////////////////////////////////////////
const USERNAME_REG = /^[A-Za-z][\w-]{1,31}$/;
const PASSWORD_REG = /^[\w-@*#]{6,32}$/;
const PHONE_LOCALES = ['zh-CN', 'zh-TW', 'en-ZA', 'en-AU', 'en-HK', 'pt-PT', 'fr-FR', 'el-GR', 'en-GB', 'en-US', 'en-ZM', 'ru-RU', 'nb-NO', 'nn-NO'];

validator.extend('isUsername', function(str) {
  return USERNAME_REG.test(str);
});

validator.extend('isPassword', function(str) {
  return PASSWORD_REG.test(str);
});

validator.extend('isMobilePhone', function(str, locales = PHONE_LOCALES) {
  if (!Array.isArray(locales)) locales = [locales];
  return locales.some(locale => _validator.isMobilePhone(str, locale));
});

validator.extend('isAccount', function(str) {
  if (this.isEmail(str)) return true;
  if (this.isUsername(str)) return true;
  return this.isMobilePhone(str);
});

export default validator;
