const { userResolvers } = require("./users");

const rootResolver = {
  ...userResolvers,
};

module.exports = { rootResolver };
