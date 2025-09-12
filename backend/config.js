const {v2: cloudinary} = require("cloudinary");
const JWT_USER_SECRET =  process.env.JWT_USER_SECRET;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

module.exports = {
    JWT_USER_SECRET,
    cloudinary
}