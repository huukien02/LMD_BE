const mongoose = require('mongoose');
const url = MONGODB_URI = 'mongodb+srv://lehuukien2002:i6DMZ0UVGFziuxb4@cluster0.jztuunn.mongodb.net/LMD?retryWrites=true&w=majority'

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connect Model User success");
    })
    .catch((err) => {
        throw err;
    });

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    email: { type: String },
    username: { type: String },
    password: { type: String },
    role: { type: String }

}, { collection: 'User' });

module.exports = mongoose.model('User', UserSchema);



