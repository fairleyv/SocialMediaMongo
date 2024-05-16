const { Schema, model } = require('mongoose');
// Schema for reactions model

const reactionSchema = new Schema(
    {
        reactionId:{
            type: mongoose.Schema.Types.ObjectId,
            default: new ObjectId
        },
        reactionBody:{
            type: String,
            required: true,
            max_length: 280,
        },
        username:{
            type: String,
            required: true,
        },
        createdAt: {
            date: date.now(),
            default: date.now,
            getter: 
        }
    }
)
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
    return this.createdAt.toISOString();
});

// Create Thought Model
const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;


// virtual reactionCount (retrieves the length of the thought's reactions array field on query)

