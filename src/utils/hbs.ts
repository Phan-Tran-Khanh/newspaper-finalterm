import slugify from 'slugify';
import * as hbsModule from 'hbs';

export default function registerHelpers(hbs: typeof hbsModule) {
  hbs.registerHelper('slugify', (text: string) => {
    return new Handlebars.SafeString(slugify(text, { lower: true }));
  });

  hbs.registerHelper(
    'ifEquals',
    (a: string, b: string, options: Handlebars.HelperOptions) => {
      return a == b ? options.fn(this) : options.inverse(this);
    },
  );
  hbs.registerHelper('times', (n, block) => {
    let accum = '';
    for (let i = 1; i <= n; i++) {
      accum += block.fn(i);
    }
    return accum;
  });
}
