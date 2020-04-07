const { userResolvers } = require("./users");
const { shoppingListResolvers } = require("./shopping-list");

const rootResolver = {
  ...userResolvers,
  ...shoppingListResolvers,
};

module.exports = { rootResolver };
