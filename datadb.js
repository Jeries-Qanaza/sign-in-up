var mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/radio-programs")
    .then(() => {
    console.log("DB Conntcted");
    })
    .catch(() => {
        console.log("DB Conntcted Failed");
    })

const schema = new mongoose.Schema({
    email: { type: String },
    password: { type: String }
})

const collection = new mongoose.model("users", schema)

module.exports= collection
