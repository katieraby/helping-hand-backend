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
createUser(userInput: {User schema}){return properties}
```

Creates a user object from data given in userInput (schema below), and saves it to the database. Returns created user obj with properties specified in {return properties}.

```
updateUser(id: "user ID", userInput: {User schema}){return properties}
```

Updates existing user matching given user ID with data provided in userInput. As it uses the same User schema (below) as createUser, the required fields are the same. When not updating these specific fields, provide the same data as already exists in the user obj. Returns updated user obj with properties specified in {return properties}.

### Shopping lists

```
createShoppingList(shoppingListInput: {"Shopping List schema"}){return properties}
```

Creates a shopping list object from data given in shoppingListInput (schema below), and saves it to the database. Returns created shopping list obj with properties specified in {return properties}

```
updateShoppingList(listId: "shopping list ID" volunnteerId: "volunteer ID", volunteerComplete: boolean, helpeeComplete: voolean){return properties}
```

This mutation is still being worked on. Only required field is listId. If volunteerId is supplied, will assign that volunteer user to the shopping list and set the orderStatus property to 'pending'. volunteerComplete and helpeeComplete are both booleans, to be sent when respective users mark the job as complete (so send true in this case). Once both are sent as true (doesn't have to be in the same mutation request), the orderStatus property will update to 'completed'.
