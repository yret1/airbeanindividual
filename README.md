# Welcome to the Airbean API


## Admin Endpoints

All admin endpoints require the logged in user to have an admin role.

When a new account is created the default role is set to "user". This can only be update by accesing the database manually for security reasons.


### Add new product

To add a new product send a POST to **/addmenuitem**

the format for the request should look like this
```
{
    "newItem" : {
        "id": Your new products id (Number not already in db),
        "title": "The product title",
        "description" : "The product description",
        "price": A number (converted to SEK),
    }
}
```
All of the fields are required.

Whenever the item is added it gets a created date in the database of when the request was made.




### Edit product

To modify a product send a POST to **/updatemenuitem**

the format for the request should look like this
```
{
	"updateItem":{
		"id": 7 (required),
		"description": "Kaffa galloj",
		"title":"Häftig kaffe va?"
	}
}
```
The id cannot be modified and is required when updating a product.

The rest of the fields are optional, only the modified fields will be updated

Whenever the item is update it gets a updated date in the database of when the request was made.


### Remove product


To delete a product send a POST to **/removemenuitem**

the format for the request should look like this
```
{
	"deleteItem":{
		"id": 7 (required),
	}
}
```

This function only takes the id of the item to be deleted.

If the item is found in the database it will be removed


## User Endpoints
