const mongoose = require("mongoose")

// var url = "mongodb://127.0.0.1:27017/DemoFrom"


var url = "mongodb://localhost:27017/DemoFrom"

mongoose.connect(url, {
    userNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB Connected")

}).catch((e) => {
    console.log("Failed", e)
})

