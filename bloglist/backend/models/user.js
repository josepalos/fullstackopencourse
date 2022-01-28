const mognoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mognoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        unique: true,
    },
    name: String,
    passwordHash: {
        type: String,
        requrired: true,
    },
    blogs: [{
        type: mognoose.Schema.Types.ObjectId,
        ref: 'Blog',
    }],
});
userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    }
});

const User = mognoose.model("User", userSchema);

module.exports = User;