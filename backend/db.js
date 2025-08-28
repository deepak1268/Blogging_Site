console.log("Loaded MONGO_URL:", process.env.MONGO_URL);
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
})

const blogSchema = new Schema({
    title: String,
    content: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users" // we pass the collection name 
    }
})

const UserModel = mongoose.model('users',userSchema);
const BlogModel = mongoose.model('blogs',blogSchema);

module.exports = {
    UserModel,
    BlogModel
}