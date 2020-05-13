var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://shamant:password%40123@cluster0-lbdon.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("examination");
    var myobj = [{
            "reg_num": "SG001",
            "firstname": "Rakesh",
            "lastname": "Sharma",
            "dob": "1993-01-01",
            "res_date": "1587191287",
            "sub": [{
                    "name": "Physics",
                    "extmarks": 50,
                    "intmarks": 28
                },
                {
                    "name": "Chemistry",
                    "extmarks": 68,
                    "intmarks": 29
                },
                {
                    "name": "Mathematics",
                    "extmarks": 40,
                    "intmarks": 25
                },
                {
                    "name": "Biology",
                    "extmarks": 30,
                    "intmarks": 25
                },
                {
                    "name": "Kannada",
                    "extmarks": 76,
                    "intmarks": 0
                },
                {
                    "name": "English",
                    "extmarks": 82,
                    "intmarks": 0
                }
            ]
        },
        {
            "reg_num": "SG002",
            "firstname": "Rahul",
            "lastname": "Dawal",
            "dob": "1993-01-01",
            "res_date": "1587191287",
            "sub": [{
                    "name": "Physics",
                    "extmarks": 60,
                    "intmarks": 28
                },
                {
                    "name": "Chemistry",
                    "extmarks": 65,
                    "intmarks": 28
                },
                {
                    "name": "Mathematics",
                    "extmarks": 60,
                    "intmarks": 25
                },
                {
                    "name": "Biology",
                    "extmarks": 60,
                    "intmarks": 25
                },
                {
                    "name": "Kannada",
                    "extmarks": 95,
                    "intmarks": 0
                },
                {
                    "name": "English",
                    "extmarks": 80,
                    "intmarks": 0
                }
            ]
        }
    ];
    dbo.collection("studentResults").insertMany(myobj, function(err, res) {
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
        db.close();
    });
});