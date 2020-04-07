const User = require("../mongo-models/users");

const userResolvers = {
  createUser: ({ userInput }) => {
    const newUser = new User({
      email: userInput.email,
      name: userInput.name,
      password: userInput.password,
      postcode: userInput.postcode,
      distanceToTravel: userInput.distanceToTravel,
      profilePhoto: userInput.profilePhoto,
    });
    return newUser
      .save()
      .then(({ _doc }) => {
        return { ..._doc };
      })
      .catch((err) => {
        next(err);
      });
  },
  users: () => {
    return User.find().then((result) => {
      const output = result.map((user) => {
        return { ...user._doc, password: "null" };
      });
      return output;
    });
  },
};

module.exports = { userResolvers };
