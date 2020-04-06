const { volunteerResolvers } = require('./volunteers');

const rootResolver = {
  ...volunteerResolvers,
};

module.exports = { rootResolver };
