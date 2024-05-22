const {User, Thought} = require ('../models')
// api/user
// get all users
module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    
    // get a single user by its _id (Populated thought and friend data)
    async getSingleUser(req, res) {
        try{
            const user = await User.findOne({_id: req.params.userId})
            .populate('thoughts')
            .populate('friends')

            if (!user) {
                return res.status(404).json({message: 'No user with this Id'});
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // post a new user
    async createUser(req,res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    
    // put to update a user by its _id
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$set: req.body},
                {runValidators: true, new: true}
            );

            if (!user) {
                return res.status(404).json({message: 'No user with this Id'})
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    
    // delete to remove user by its _id
    async deleteUser (req, res) {
        try {
            const user = await User.findOneAndDelete({_id: req.params.userId});

            if (!user) {
                return res.status(404).json({message: 'No user with this Id'});
            }

            res.json({message: 'User Successfully deleted'});

            const thoughts = await Thought.deleteMany({username: req.params.userId});

            if (!thoughts) {
                return res.json({message:'No thoughts to delete'});
            }

            res.json({message: 'Thought(s) successfully deleted'});

        } catch (err) {
            res.status(500).json(err);
        }
    },
    
    // api/users/:userId/friends/:friendsId
    // to add a new friend to a user's friend list
    
    // to remove a friend from a user's friend list
};
