const { Schema, model} = require('mongoose');

// Schema to create user model

const userSchema = new Schema({
    username: {
        // username(string,unique,required,trimmed)
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        // email(string,required,unique,validate(email))
        type: String,
        required: true,
        lowercase: true,
        validate: {
            validator: function(email) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            }
        }
    },
    thoughts: {
        // thoughts (array of _id values referencing the thought model)
        thoughts: []
    },
    friends: {
        // array of _id values referncing the user model (self-reference)
    }
}
);

// create a friendCount virtual that retrieves the length of the user's friends array field on query