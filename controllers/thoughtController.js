const { User, Thought } = require('../models')

module.exports = {
    // api/thought
    // get to get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err)
        }
    },

    // post to create a new thought(don't forget to push the created thought's _id to the associated user's thoughts array fields)
    async createThought(res,req) {
        try{
            const thought = await Thought.create(req.body);
            res.json(thought);
            const user = await User.findOneAndUpdate(
                {username: req.body.username},
                {$addToSet: {thoughts: thought._id}},
                {new: true}
        );
        if (!user) {
            return res.status(404).json({message: 'No user with that ID found'});
        }
        } catch (err) {
            res.status(500).json(err)
        }
    },

    // api/thought/:thoughtId
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
    },
    
    // put to update a thought by its _id
    async updateThought(res, req) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$set: req.body},
                {runValidators: true, new: true}
            );

            if (!thought) {
                return res.status(404).json({message: 'No thought with this Id'});
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    
    // delete to remove a thought by its _id
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({_id: req.params.thoughtId});

            if (!thought) {
                return res.status(404).json({message: 'No thought with that ID'})
            }

            const user = await User.findOneAndUpdate(
                {thoughts: req.params.thoughtId},
                {$pull: {thoughts: req.params.thoughtId}},
                {new: true}
            )
            if(!user) {
                return res.status(404).json({message: 'Thought deleted, but no user with Thought found'})
            }

            res.json({message: 'Thought successfully deleted'})
        } catch (err) {
            res.status(500).json(err);
        }
    },
    
    // api/thought/:thoughtId/reaction
    // post to create a reaction stored in a single thought's reactions array field
    async createReaction (req,res) {
        try {
            const thought = await Thought .findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$addToSet: {reactions: req.body}},
                {runValidators: true, new: true}
            )

            if (!thought) {
                return res.status(404).json({message: 'No thought with this id'})
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // api/thought/:thoughtId/reaction/:reactionId

    // delete to pull and remove a reaction by the reaction's reactionId value
    async deleteReaction(req,res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$pull: {reactions: {reactionId: req.params.reactionId}}},
                {runValidators: true, new: true}
            )

            if (!thought) {
                return res.status(404).json({message: 'No thought with this Id'});
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};