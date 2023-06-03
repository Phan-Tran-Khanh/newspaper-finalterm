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
}
