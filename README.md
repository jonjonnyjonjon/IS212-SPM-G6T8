
# Installing dependencies
(Run these in the main directory)

Install the server's dependencies.
`npm install --prefix ./backend`

Install the frontend web app's dependencies.
`npm install`

# Creating a .env file in backend folder
Create a .env file in the backend folder to connect with your local database.
```
RDS_HOSTNAME=
RDS_USERNAME=
RDS_PASSWORD=
RDS_PORT=
RDS_DB_NAME=

DB_HOST=
DB_USER=
DB_PASSWORD=
```
Fill up DB_HOST, DB_USER, DB_PASSWORD, RDS_PORT, RDS_DB_NAME to connect to your local database. 
Fill up the rest to connect with a cloud database (in this case, AWS RDS).

# Starting the server and web app
Start the server before the frontend web app.

### Server
Ensure that you have your MAMP or local database running on port 3306, otherwise the server will not connect.
To start the server, run the following in the main directory (port 5000).
`npm run start`

If you wish to connect to a cloud database (e.g. AWS RDS) instead, you can also start the server by running this command. This will allow you to connect with your desired cloud database instead.
`NODE_ENV=production npm run start`

### Web App
To start the frontend web app, run the following in the main directory (port 3000).
`npm run start-client`
