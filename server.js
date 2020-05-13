const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const CONNECTION_URL = "mongodb+srv://shamant:password%40123@cluster0-lbdon.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_NAME = "examination";


var app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

//CORS Middleware
app.use(function(req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

var database, collection;

app.listen(8080, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if (error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("studentResults");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});

app.post("/getExamResult", (request, response) => {

    var reg_no = request.body.reg_no;
    var dob_val = request.body.dob;

    var query = { reg_num: reg_no, dob: dob_val };



    // .sort({_id:-1}).limit(1) to get last inserted record

    collection.find(query).sort({ _id: -1 }).limit(1).toArray((error, result) => {
        if (error) {
            return response.status(500).send(error);
        }
        response.status(200).send(result);
    });

    // collection.findOne(query, function(err, result) {
    //     if (err) return response.status(500).send(error);
    //     response.status(200).send(result);
    // });

    // collection.insert(request.body, (error, result) => {
    //     if(error) {
    //         return response.status(500).send(error);
    //     }
    //     response.send(result.result);
    // });
});