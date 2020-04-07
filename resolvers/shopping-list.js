const ShoppingList = require("../mongo-models/shopping-list");
const User = require("../mongo-models/users");

const shoppingListResolvers = {
  createShoppingList: ({ shoppingListInput }) => {
    const newShoppingList = new ShoppingList({
      helpee: shoppingListInput.helpee,
      listImage: shoppingListInput.listImage,
      listText: shoppingListInput.listText,
    });
    const helpee = User.findById(shoppingListInput.helpee);
    let changedShoppingList;

    return Promise.all([helpee, newShoppingList.save()])
      .then(([helpee, shoppingList]) => {
        const { _doc } = shoppingList;
        helpee.shoppingListId.push(_doc._id);
        return Promise.all([_doc, helpee.save()]);
      })
      .then(([shoppingList, helpee]) => {
        console.log("shoppingList>>>>>", shoppingList);
        console.log("helpee>>>>>", helpee);
        changedShoppingList = {
          ...shoppingList,
          createdAt: new Date(shoppingList.createdAt),
          updatedAt: new Date(shoppingList.updatedAt),
          helpee: helpee,
        };
        console.log("changedShoppingList>>>>>>>", changedShoppingList);
        return changedShoppingList;
      });
  },
};

module.exports = { shoppingListResolvers };
