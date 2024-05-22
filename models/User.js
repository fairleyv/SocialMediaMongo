const { Schema, model } = require('mongoose');

// Schema to create user model

const userSchema = new Schema({
    // username(string,unique,required,trimmed)
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    // email(string,required,unique,validate(email))
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate: {
            validator: function(email) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            },
            message: 'Please enter a valid email address'
        }
    },
    // thoughts (array of _id values referencing the thought model)
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    // array of _id values referncing the user model (self-reference)
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});
// create a friendCount virtual that retrieves the length of the user's friends array field on query
userSchema.virtual('friendCount').get(function(){
    return this.friends.length
});

//  Create User Model
const User = model('User', userSchema);

module.exports = User;
