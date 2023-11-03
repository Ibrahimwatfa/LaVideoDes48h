"use strict";

/**
 * suggestion router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::suggestion.suggestion", {
  config: {
    find: {
      middlewares: ["api::suggestion.suggestion-populate-middleware"],
    },
    findOne: {
      middlewares: ["api::suggestion.suggestion-populate-middleware"],
    },
  },
});
