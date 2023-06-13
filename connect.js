const mongoose = require('mongoose');
async function connectToMongoo(url) {
    await mongoose.connect(url);
    console.log('connection to the mongo db successfully');
}
module.exports = connectToMongoo;