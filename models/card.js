const mongoose = require('mongoose');
const url = MONGODB_URI = 'mongodb+srv://lehuukien2002:i6DMZ0UVGFziuxb4@cluster0.jztuunn.mongodb.net/LMD?retryWrites=true&w=majority'

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connect Model Card success");
    })
    .catch((err) => {
        throw err;
    });

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CardSchema = new Schema({
    name: { type: String },
    phone: { type: String },
    address: { type: String },
    note: { type: String },
    total: { type: String },
    listProduct: { type: Array }

}, { collection: 'Card' });

module.exports = mongoose.model('Card', CardSchema);



