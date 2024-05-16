const { Schema, model } = require('mongoose');
const {format } = require('date-fns');
// Schema for reactions model

const reactionSchema = new Schema(
    {
        reactionId:{
            type: mongoose.Schema.Types.ObjectId,
            default: mongoose.Types.ObjectId
        },
        reactionBody:{
            type: String,
            required: true,
            maxlength: 280,
        },
        username:{
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: date.now
        }
    });
// virtual reactionCount (retrieves the length of the thought's reactions array field on query)
reactionSchema.virtual('formattedCreatedAt').get(function () {
    return format(this.createdAt, 'MM/dd/yyyy');
});

// Schema to create thought model

const thoughtSchema = new Schema(
    {
        // thoughtText (string, required, between 1 and 280 characters)
     thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
     },
     createdAt: {
        type: Date,
        default: Date.now
     },
     username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
     },
     reactions: [reactionSchema]
    }
);

thoughtSchema.virtual('formattedCreatedAt').get(function() {
    return format(this.createdAt, 'MM/dd/yyyy');
});

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// Create Thought Model
const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;



