# API

# System Requirements to run the app
    - dotnet core 2.1.8
    - MSSQL Server

# First steps
    - Change the value for Server to your sql server instance in appsettings.Development.json and appsetting.json file
    - cd into Api directory and run `dotnet restore` on the terminal
    - run dotnet ef database update to update the database with the initial migrations in the Migrations directory
    - Once restore is completed run dotnet run / dotnet watch run
    - Postman collection to test the apis can be found in the link below
    - https://www.getpostman.com/collections/a79ad1f9e89e535612a4

# Changes made to API
    - I Created only one authentication endpoint (Reason: so as not to repeat the same implementation)
    - But I did add a property to ensure which kind of user is trying to login

    - I also assigned the Admin (Reviewer of the story) on creation of the story 

    - FallBackController was added to handle routing error once the SPA is built into the webroot path of the api


# CLIENT

# Requirements
    - node (version 10.0 up)

# First Steps
    - run npm i from the Client directory
    - run ng serve (default port is 4200) <optionally run ng serve --port $PORT (e.g 3000)>
