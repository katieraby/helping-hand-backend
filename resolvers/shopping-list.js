const ShoppingList = require("../mongo-models/shopping-list");
const User = require("../mongo-models/users");

const shoppingListResolvers = {
  createShoppingList: ({ shoppingListInput }) => {
    // console.log("shopping resolver >>>>", shoppingListInput);
    const newShoppingList = new ShoppingList({
      helpee: shoppingListInput.helpee,
      listImage: shoppingListInput.listImage,
      listText: shoppingListInput.listText,
    });
    const helpee = User.findById(shoppingListInput.helpee);
    return Promise.all([helpee, newShoppingList.save()]).then(
      ([helpee, shoppingList]) => {
        // console.log(helpee, _doc);
        const { _doc } = shoppingList;
        const changedShoppingList = {
          ..._doc,
          createdAt: new Date(_doc.createdAt),
          updatedAt: new Date(_doc.updatedAt),
          helpee: { ...helpee },
          // helpee: helpee.bind(this, _doc.helpee),
        };
        console.log("changedShoppingList >>>", changedShoppingList);
        return {
          ..._doc,
          createdAt: new Date(_doc.createdAt),
          updatedAt: new Date(_doc.updatedAt),
          helpee: { ...helpee._doc },
          // helpee: helpee.bind(this, _doc.helpee),
        };
      }
    );
  },
};

module.exports = { shoppingListResolvers };
