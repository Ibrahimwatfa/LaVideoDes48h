"use strict";

module.exports = (config, { strapi }) => {
  // This is where we add our middleware logic
  return async (ctx, next) => {
    ctx.query.populate = {
      fields: ["id"],
      category: {
        fields: ["id"],
      },
    };

    console.log("suggestion-populate-middleware.js: ctx.query = ", ctx.query);

    await next();
  };
};
