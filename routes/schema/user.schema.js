const Schema = require('mongoose').Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
    },
    password: String,
    reviews: [String]
}, {
    collection: 'users',
})

module.exports = UserSchema;