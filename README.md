# Node CSV App
creating an application that users can upload a csv file and store data in the database 
when a user uses this application he/she should create the table in mysql and edit the database connection configuration to his.

## Dependencies

- express
- body-parser
- msyql2
- morgan
- nodemon
- multer
- fast csv
- dotenv

created using nodejs where a user can upload a csv file and the data will be stored in the database 
to run the application:

`$ git clone git@github.com:wairimu-ian/node-csv-app.git`

after git cloning the application change directory:

`$ cd node-csv-app`

run:

`$ npm install`

this will install all the dependencies and create a package.json and a node_module for you.
then run:

`$ npm start`

to start the application.

![node terminal](https://github.com/wairimu-ian/node-csv-app/blob/main/images/Screenshot%20from%202022-10-14%2006-21-38.png)

the app will run on localhost:8080

`localhost:8080/`

to see the application

![csv](https://github.com/wairimu-ian/node-csv-app/blob/main/images/csv.png)

the user will be prompted to enter the csv file

![data](https://github.com/wairimu-ian/node-csv-app/blob/main/images/data.png)

upon submitting the csv file the user will be taken to a success page if the file
was submitted to the database

![success](https://github.com/wairimu-ian/node-csv-app/blob/main/images/success.png)

![success](https://github.com/wairimu-ian/node-csv-app/blob/main/images/Screenshot%20from%202022-10-14%2006-44-48.png)

![node terminal](https://github.com/wairimu-ian/node-csv-app/blob/main/images/Screenshot%20from%202022-10-14%2006-45-29.png)

