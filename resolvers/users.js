const User = require('../mongo-models/users');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const axios = require('axios');
let API_KEY;
if (!process.env.API_KEY) {
  const apiConfig = require('../config');
  API_KEY = apiConfig.mapAPIKey;
} else {
  API_KEY = process.env.API_KEY;
}

const userResolvers = {
  createUser: ({ userInput }) => {
    return User.find({ email: userInput.email }).then((result) => {
      if (result.length > 0) {
        throw new Error('User already exists');
      } else {
        return axios
          .get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${userInput.streetAddress},${userInput.city},${userInput.postcode}&key=${API_KEY}`
          )
          .then((res) => {
            const locationLatLng = [
              res.data.results[0].geometry.location.lat,
              res.data.results[0].geometry.location.lng,
            ];
            return bcrypt
              .hash(userInput.password, 12)
              .then((hashedPassword) => {
                const newUser = new User({
                  email: userInput.email,
                  name: userInput.name,
                  phoneNumber: userInput.phoneNumber,
                  password: hashedPassword,
                  postcode: userInput.postcode,
                  streetAddress: userInput.streetAddress,
                  city: userInput.city,
                  distanceToTravel: userInput.distanceToTravel,
                  profilePhoto: userInput.profilePhoto,
                  userType: userInput.userType,
                  locationLatLng: locationLatLng,
                });
                return newUser.save();
              })
              .then(({ _doc }) => {
                return { ..._doc, password: null };
              })
              .catch((err) => {
                throw err;
              });
          });
      }
    });
  },
  users: () => {
    return User.find()
      .populate('shoppingListId')
      .then((result) => {
        const output = result.map((user) => {
          return { ...user._doc, password: null };
        });
        return output;
      });
  },
  userById: ({ id }) => {
    const mongooseID = mongoose.Types.ObjectId(id);
    return User.findById(mongooseID).then((result) => {
      const output = { ...result._doc, password: null };
      return output;
    });
  },
  login: ({ email, password }) => {
    return User.findOne({ email: email })
      .populate('shoppingListId')
      .then((user) => {
        return bcrypt.compare(password, user.password).then((result) => {
          if (result) {
            return user;
          } else {
            throw new Error('Incorrect email or password');
          }
        });
      });
  },
  updateUser: ({ id, userInput }) => {
    const mongooseID = mongoose.Types.ObjectId(id);
    return bcrypt.hash(userInput.password, 12).then((hashedPassword) => {
      const updatedUser = { ...userInput, password: hashedPassword };
      return User.findByIdAndUpdate(mongooseID, updatedUser).then((result) => {
        return User.findById(result._doc._id).then((result) => {
          return { ...result._doc, password: null };
        });
      });
    });
  },
};

module.exports = { userResolvers };
