const express = require('express');
const route = require('./route/route.js');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

mongoose.set('strictQuery', true)

mongoose.connect("mongodb+srv://Lucifer:lucifer123@late.1ll0unk.mongodb.net/blockchain?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});

