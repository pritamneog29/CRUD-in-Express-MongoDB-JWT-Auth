var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/node-demo");

var listingSchema = new mongoose.Schema({
    id: String,
    Name: String,
    Image: String,
    Details: String,
    Segment: String
});

var Listing = mongoose.model("Listing", listingSchema);

app.get("/",(req,res) => {
    return JSON.stringify(res);
})

app.get("/" + id, (req, res) => {
    return res.filter(x => x.id == id);
});

app.post("/" + id, (req, res) => {
    var myData = new Listing(req.body);
    myData.save()
        .then(item => {
            res.send("Listing Added");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

app.delete("/" + id, (req, res) => {
    var myData = new Listing(req.body);
    myData.delete()
        .then(item => {
            res.send("Listing deleted");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

app.put("/"+id, (req, res)=>{
    var myData = new Listing(req.body);
    myData.put()
        .then(item => {
            res.send("Listing Added");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});
