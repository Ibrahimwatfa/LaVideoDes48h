module.exports = [
  "strapi::errors",
  "strapi::security",
  {
    name: "strapi::cors",
    config: {
      enabled: true,
      headers: "*",
      origin:
        process.env.NODE_ENV === "production"
          ? [
              "https://lavideodes48h.fr",
              "https://www.lavideodes48h.fr",
              "https://api.lavideodes48h.fr",
            ]
          : ["http://localhost:3000", "http://localhost:1337"],
    },
  },
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
