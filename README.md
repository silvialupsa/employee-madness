# Employee Data

The application is designed for managing information about company employees and equipment. It provides functionalities to create, update, and delete both employees and equipment records. Each employee can have their presence status, be assigned equipment, and their position can be dynamically adjusted based on their salary. The application displays information in pages, with each page showing ten employees. Sorting options are available for organizing the data by name, position, and level.


# Project Screen Shots
<img width="1276" alt="image" src="https://github.com/silvialupsa/employee-madness/assets/108224053/c9da943f-8f96-419b-a66d-9f6382b1a196">
<img width="1272" alt="image" src="https://github.com/silvialupsa/employee-madness/assets/108224053/a49b21b2-5cd3-4b4f-9a2d-a5849f8ab54f">
<img width="1273" alt="image" src="https://github.com/silvialupsa/employee-madness/assets/108224053/6ead4074-6d84-43b2-91b7-235581dd3cd1">


# Reflection
This project was undertaken during the fifth week of the second module at CodeCool Programming School, spanning a one-week duration. The objectives encompassed applying technologies learned thus far and delving into the documentation to integrate new features. The primary aim was to enhance an existing employee data management application. I inherited a partially developed project and was tasked with augmenting functionality to the buttons on the employee page. Furthermore, I expanded the feature set for employees and established equipment management from the ground up. The design ensures convenient access and search capabilities for both employees and equipment based on various criteria.

# Challenges
The main challenge was to work with both the server-side and client-side at the same time.

# Lessons
I learned how to add data to the database and how to properly connect the database to the server.

# Technologies
 Node, React, MongoDb, Express. 

# Setup Instructions
Clone down the repository

## Server side

### Install dependencies
```bash
cd ./server
npm install
```

### .env file
Copy the .env.sample as .env and fill up the environment variable for your personal mongodb connecttion url.

### Prepare the database

```bash
cd ./server
npm run populate
```

**populate command** will run the populate.js file as a script and it will generate a buch of starter data for your database. 

### Running the code

```bash
cd ./server
npm run dev
```

It will start the server with nodemon. So it will watch the changes and restart the server if some ot the files changed.

### Testing with test.http

If you like to try the endpoints of the rest api, you can check the test.http file for urls are should work on your environment as well. And if you install the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extenstion for vscode you can actually run those in your editor.



## Client side

### Install dependencies

```bash
cd ./client
npm install
```

### Proxy

Watch for the port of your rest api. By default it will bind on port 8080 and the frontend proxy settings also depend on this configuration. If you for some reasons change the port of the backend, don't forget to change the ./client/package.json proxy settings as well.

### Runnig the code

```bash
cd ./client
npm start
```

And the create-react-app react-scripts package will start your frontend on the 3000 port and you can visit the http://localhost:3000 on your preferred browser.
