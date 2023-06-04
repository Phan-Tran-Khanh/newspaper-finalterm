import * as hbsModule from 'hbs';

export default function registerHelpers(hbs: typeof hbsModule) {
  hbs.registerHelper(
    'ifEquals',
    (a: any, b: any, options: Handlebars.HelperOptions) => {
      if (!a || !b) return options.inverse(this);
      return a == b ? options.fn(this) : options.inverse(this);
    },
  );
  hbs.registerHelper('times', (n, options) => {
    const start = 1;
    const end = parseInt(n, 10);
    let result = '';
    for (let i = start; i <= end; i++) {
      result += options.fn(i);
    }
    return result;
  });
}
