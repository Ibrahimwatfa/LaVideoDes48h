"use strict";

/**
 * `page-populate-middleware` middleware
 */
const populate = {
  contentSections: {
    populate: {
      image: {
        fields: ["url", "alternativeText", "caption"],
      },
      background: {
        fields: ["url", "alternativeText", "caption"],
      },
    },
  },
  seo: {
    fields: ["metaTitle", "metaDescription"],
    populate: { shareImage: true },
  },
};

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    ctx.query = {
      populate,
      filters: { slug: ctx.query.filters.slug },
      locale: ctx.query.locale,
    };

    await next();
  };
};
