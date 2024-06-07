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


### Create a promo discount

To create a discount send a POST to **/creatediscount**

the format for the request should look like this
```
{
	"discount" : {
		"combo": [2,4,6],
		"discount": "10%",
		"code": "evensteven"
	}
}
```
*combo* A list of the product id's that the discount should be applied to
*discount* The percentage discount to be applied
*code* The name of the discount. Used in order logic.

All fields here are required!





## User Endpoints


## Auth operations

### Sign Up

To create a new account send a POST to **/signup**

the format for the request should look like this
```
{
"username": "Simon",
"password" : "kakor",
"email" : "simon@gmail.com"
}
```
All fields are required


### Log In

To log in send a POST to **/login**

the format for the request should look like this
```
{
"username": "Simon",
"password" : "kakor"
}
```
All fields are required


### Guest

To use a guest account send a GET to **/guest**

***IMPORTANT*** Guests can not review order history


## Order handling


### View Menu

To view the menu send a GET to **/menu**

The user needs to be on a user or guest account


### Add to cart

To add a new product to the cart send a POST to **/addtocart**


The user needs to be on a user or guest account

The request should look like this
```
{
 "add" : {
	"id": 1,
	 "quantity": 15
 }
}
```

All fields are required

### Remove from cart

To add a new product to the cart send a POST to **/addtocart**


The user needs to be on a user or guest account

The request should look like this
```
{
    "remove": {
        "id": 1
    }
}
```

All fields are required


### View cart

To view the cart send a GET to **/viewcart**

The user needs to be on a user or guest account


### Place order

When the user is happy with the items in cart

Send a GET request to **/create**

This will place an order with a searchable id into the database.

Delivery data is not yet available


### Show previous orders

Send a GET request to **/orderhistory**

The user needs to be logged in for this feature










# **Thanks for using Airbean!**






