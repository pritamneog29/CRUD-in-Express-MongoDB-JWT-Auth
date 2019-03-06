# CRUD-in-Express-MongoDB
CRUD operation using NodeJs Express api on a MongoDB database residing locally.
JWT used for authentication based on token

# Initial Setup
npm install

# Run Application
node app.js

# Point mongoDB to save in a specific local folder
Go to mongoDB installation path, usually "C:\Program Files\MongoDB\Server\4.0\bin" and run the command below:

mongod --dbpath "path of the folder"

*Go to url "/users/register" and register a user by providing 'name', 'email' and 'password' inside body.

*Authenticate the user to make use of the APIs by providing the registered email and password inside the body, url "/users/authenticate".

*Provide the token received through the response from authentication inside 'x-access-token' and use the services.

# API paths
*/listings/
*/listings/:id

# DB attributes
Name,Image,Details,Segment.


