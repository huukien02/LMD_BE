const mongoose = require('mongoose');
const url = MONGODB_URI = 'mongodb+srv://lehuukien2002:i6DMZ0UVGFziuxb4@cluster0.jztuunn.mongodb.net/LMD?retryWrites=true&w=majority'

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connect Model List success");
    })
    .catch((err) => {
        throw err;
    });

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PetSchema = new Schema({
    imageOne: { type: String },
    imageTwo: { type: String },
    imageThree: { type: String },
    imageFour: { type: String },
    name: { type: String },
    price: { type: String },
    type: { type: String },
    detail: { type: String }

}, { collection: 'List_Pet' });

module.exports = mongoose.model('List_Pet', PetSchema);



