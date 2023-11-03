module.exports = ({ env }) => ({
  seo: {
    enabled: true,
  },
  io: {
    enabled: true,
    config: {
      IOServerOptions: {
        cors: {
          origin:
            process.env.NODE_ENV === "production"
              ? ["https://lavideodes48h.fr", "https://www.lavideodes48h.fr"]
              : "http://localhost:3000",
          methods: ["GET", "POST"],
          serveClient: false,
        },
      },
      contentTypes: {
        suggestion: ["create", "update"],
      },
      events: [
        {
          name: "connection",
          handler: ({ strapi }, socket) => {
            strapi.log.info(`[io] new connection with id ${socket.id}`);

            socket.on("disconnect", (reason) => {
              strapi.log.info(`disconnect ${socket.id} due to ${reason}`);
            });
          },
        },
      ],
    },
  },
});
