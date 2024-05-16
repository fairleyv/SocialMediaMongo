const { User, Thought } = require('../models')

module.exports = {
    // api/thoughts
    // get to get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    
    // get to get single thought by its _id
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({_id: req.params.thoughtId});
            if (!thought) {
                return res.status(404).json({message: 'No thought with that id exists'});
            };
            return res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    
    // post to create a new thought(don't forget to push the created thought's _id to the associated user's thoughts array fields)
    
    // put to update a thought by its _id
    
    // delete to remove a thought by its _id
    
    // api/thoughts/:thoughtId/reactions
    // post to create a reaction stored in a single thought's reactions array field
    
    // delete to pull and remove a reaction by the reaction's reactionId value

};