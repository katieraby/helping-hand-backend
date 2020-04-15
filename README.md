# Helping Hand backend readme

## Queries

### Users

```
users{return properties}
```

Returns an array of every user in the database with properties specified in {return properties}

```
userById(id: "user ID"){return properties}
```

Returns single user object that matches given ID with properties specified in {return properties}

### Shopping Lists

```
shoppingLists{return properties}
```

Returns an array of every shopping list in the database with properties specified in {return properties}

```
shoppingListById(id: "shopping list ID"){return properties}
```

Returns single shopping list object that matches given ID with properties specified in {return properties}

### Utilities

```
login(email: "email" password: "password"){return properties}
```

Performs login operation with given email and password combo. Checks that email and password combination are a match. Returns user object with properties specified in {return properties} if it's a match, returns an error if not.

```
filterByDistance(target: "volunteer ID"){return properties}
```

Filters all shopping lists in the database by the distanceToTravel property of the user with given ID. Returns an array of all shopping list objects whose distance from the users location is less than their distanceToTravel property. Returns properties specified in {return properties}.

## Mutations

### Users

```
createUser(userInput: {User input}){return properties}
```

Creates a user object from data given in userInput (input below), and saves it to the database. Returns created user obj with properties specified in {return properties}.

```
updateUser(id: "user ID", userInput: {User input}){return properties}
```

Updates existing user matching given user ID with data provided in userInput. As it uses the same User input (below) as createUser, the required fields are the same. When not updating these specific fields, provide the same data as already exists in the user obj. Returns updated user obj with properties specified in {return properties}.

### Shopping lists

```
createShoppingList(shoppingListInput: {"Shopping List input"}){return properties}
```

Creates a shopping list object from data given in shoppingListInput (inputs below), and saves it to the database. Returns created shopping list obj with properties specified in {return properties}

```
updateShoppingList(listId: "shopping list ID" volunnteerId: "volunteer ID", volunteerComplete: boolean, helpeeComplete: voolean){return properties}
```

Only required field is listId. If `volunteerId` is supplied, will assign that volunteer user to the shopping list and set the `orderStatus` property to `'accepted'`. `volunteerComplete` and `helpeeComplete` are both booleans, to be sent when respective users mark the job as complete (so send true in this case). Once both are sent as true (not in the same mutation request), the `orderStatus` property will update to `'completed'`.

## Input

These are the formats required for creating/updating new users and shopping lists. Required fields are denoted with an ! on the end.

### User

```
  name: String!
  email: String!
  phoneNumber: String!
  password: String!
  streetAddress: String
  city: String
  postcode: String!
  distanceToTravel: Float
  profilePhoto: String
  userType: String!
```

### Shopping list

```
  helpee: String!
  listImage: String
  listText: [String]
```

## Schema

This is the overall schema for users and shopping lists, showing what properties they have when stored in the database (and by extension which properties you can ask to be returned in your queries/mutations). Non-nullable fields are donated with an ! on the end.

### Users

```
  _id: ID!
  name: String!
  email: String!
  phoneNumber: String!
  password: String
  streetAddress: String
  city: String
  postcode: String!
  distanceToTravel: Float
  profilePhoto: String
  shoppingListId: [ShoppingList!]
  userType: String
  locationLatLng: [Float]
```

### Shopping list

```
  _id: ID!
  orderStatus: String!
  helpee: User!
  volunteer: User
  listImage: String
  listText: [String]
  createdAt: String!
  updatedAt: String!
```
