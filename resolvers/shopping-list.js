const ShoppingList = require('../mongo-models/shopping-list');
const User = require('../mongo-models/users');
const mongoose = require('mongoose');
const axios = require('axios');
let API_KEY;
if (!process.env.API_KEY) {
  const apiConfig = require('../config');
  API_KEY = apiConfig.mapAPIKey;
} else {
  API_KEY = process.env.API_KEY;
}

const shoppingListResolvers = {
  shoppingLists: () => {
    return ShoppingList.find()
      .populate('helpee')
      .populate('volunteer') // <<<< CHECK!!
      .then((result) => {
        return result;
      });
  },
  shoppingListById: ({ id }) => {
    const mongooseID = mongoose.Types.ObjectId(id);
    return ShoppingList.findById(mongooseID)
      .populate('helpee')
      .populate('volunteer')
      .then((result) => {
        return result;
      });
  },
  createShoppingList: ({ shoppingListInput }) => {
    const newShoppingList = new ShoppingList({
      helpee: shoppingListInput.helpee,
      listImage: shoppingListInput.listImage,
      listText: shoppingListInput.listText,
    });
    const helpee = User.findById(shoppingListInput.helpee);
    let changedShoppingList;
    return User.findById(shoppingListInput.helpee).then((res) => {
      if (res !== null) {
        return Promise.all([helpee, newShoppingList.save()])
          .then(([helpee, shoppingList]) => {
            const { _doc } = shoppingList;
            helpee.shoppingListId.push(_doc._id);
            return Promise.all([_doc, helpee.save()]);
          })
          .then(([shoppingList, helpee]) => {
            changedShoppingList = {
              ...shoppingList,
              createdAt: new Date(shoppingList.createdAt),
              updatedAt: new Date(shoppingList.updatedAt),
              helpee: helpee,
              // helpee: helpee.bind(this, shoppingList.helpee),
            };
            return changedShoppingList;
          });
      } else {
        throw new Error('User does not exist. Check ID');
      }
    });
  },
  filterByDistance: ({ target }) => {
    volunteer = User.findById(target);
    lists = ShoppingList.find({ orderStatus: 'pending' }).populate('helpee');
    return Promise.all([volunteer, lists]).then(([volunteer, lists]) => {
      const formattedLists = [];
      lists.forEach((list) => {
        const listObj = {
          id: list._id,
          location: list.helpee.locationLatLng,
        };
        formattedLists.push(listObj);
      });
      const urlArr = [];
      formattedLists.forEach((list) => {
        urlArr.push(list.location.join(','));
      });
      return axios
        .get(
          `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${volunteer.locationLatLng.join(
            ','
          )}&destinations=${urlArr.join('|')}&key=${API_KEY}`
        )
        .then((res) => {
          const distances = [];
          res.data.rows[0].elements.forEach((el, i) => {
            const distanceToTarget = Number(el.distance.text.split(' ')[0]);
            formattedLists[i].distance = distanceToTarget;
          });
          const listsWithinDistance = formattedLists.filter((list) => {
            return list.distance <= volunteer.distanceToTravel;
          });
          const ids = [];
          listsWithinDistance.forEach((list) => {
            ids.push(list.id);
          });
          return ShoppingList.find({
            _id: { $in: ids },
          })
            .populate('helpee')
            .then((res) => {
              const output = [];
              res.forEach((list, i) => {
                const listOutput = {
                  ...list._doc,
                  distance: listsWithinDistance[i].distance,
                };
                output.push(listOutput);
              });
              return output;
            });
        });
    });
  },

  updateShoppingList: ({
    listId,
    volunteerId,
    volunteerComplete,
    helpeeComplete,
  }) => {
    return ShoppingList.findById(listId).then((res) => {
      if (res === null) {
        throw new Error('Shopping list not found, check shopping list ID');
      } else {
        if (volunteerId) {
          if (!res.volunteer && res.orderStatus === 'pending') {
            return User.findById(volunteerId).then((volunteer) => {
              res.orderStatus = 'accepted';
              res.volunteer = volunteer;
              return res.save().then(() => {
                return ShoppingList.findById(listId)
                  .populate('helpee')
                  .populate('volunteer')
                  .then((result) => {
                    return result;
                  });
              });
            });
          } else {
            throw new Error('Order already accepted or completed');
          }
        } else if (volunteerComplete && res.orderStatus === 'accepted') {
          res.volunteerComplete = true;
          if (res.volunteerComplete && res.helpeeComplete) {
            res.orderStatus = 'completed';
          } else {
            res.orderStatus = 'delivered';
          }
          return res.save().then(() => {
            return ShoppingList.findById(listId)
              .populate('helpee')
              .populate('volunteer')
              .then((result) => {
                return result;
              });
          });
        } else if (helpeeComplete) {
          res.helpeeComplete = true;
          if (res.volunteerComplete && res.helpeeComplete) {
            res.orderStatus = 'completed';
          }
          return res.save().then(() => {
            return ShoppingList.findById(listId)
              .populate('helpee')
              .populate('volunteer')
              .then((result) => {
                return result;
              });
          });
        } else {
          throw new Error(
            "Something went wrong, check your IDs and make sure you're not trying to set a pending order to complete without first accepting or something"
          );
        }
      }
    });
  },
  //addVolunteerToShoppingList
  //changeStatusOfShoppingList
};

module.exports = { shoppingListResolvers };
