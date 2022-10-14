const express = require("express");
const csv = require("fast-csv");
const mysql = require("mysql2");
const multer = require("multer");
const path = require("path");
const morgan = require("morgan");
const fs = require("fs");
const bodyParser = require("body-parser");
require("dotenv").config();
// initializing app
const app = express();

app.use(express.static(("./public")))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({
    extended: true
}))

// making a database connection
const db = mysql.createConnection({
    host: "localhost",
    user: process.env.USER_DATABASE,
    password: process.env.PASSWORD_DATABASE,
    database: process.env.DATABASE_NAME,
    dateStrings: true
});
// connecting to the database and if there is an error print the error message
// else print connected successfully
db.connect(err => {
    if (err) {
        return console.error(err.message)
    }
    console.log("Successfully Connected to the database")
});
let storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './uploads/');
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
let upload = multer({
    storage: storage
});
let uploadCSV = (file) => {
    let stream = fs.createReadStream(file);
    let csvData = [];
    let fileStream = csv
        .parse()
        .on("data", (data) => {
            csvData.push(data);
        })
        .on("end", () => {
            csvData.shift();
            db.connect(err => {
                if (err) {
                    console.log(err.message);
                }else {
                    let query = 'INSERT INTO commerce (InvoiceNo, StockCode, Description, Quantity, InvoiceDate, UnitPrice, CustomerID, Country) VALUES ?';
                    db.query(query, [csvData], (err, res) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log(res);
                    });
                }
            });
            fs.unlinkSync(file);
        });
    stream.pipe(fileStream);
};
// making a get request to render the index.html file we created
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.get('/success', (req, res) => {
    res.sendFile(__dirname + "/alert.html");
} )
// post request to upload the csv file
app.post('/csv-upload', upload.single("csv-upload"), (req, res) => {
    uploadCSV(__dirname + '/uploads/' + req.file.filename);
    console.log("File has been uploaded: ");
    res.redirect("/success")
});
const PORT = process.env.PORT || 3000;
// making our server listen to port 3000
const server = app.listen(PORT, () => {
    console.log(`listening on port http://localhost:${PORT}/`)
})
// terminating the server process gracefully
process.on('SIGTERM', () => {
    server.close(() => {
        console.log("server process terminated successfully")
    })
})
