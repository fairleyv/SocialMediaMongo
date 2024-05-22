const mongoose = require('mongoose');
const connection = require('../config/connection');
const { faker } = require('@faker-js/faker');
const {User, Thought} = require('../models');

// Connect to MongoDB
connection.on ('error', (err) => err);
// Seed function
connection.once('open', async() => {

    async function seed() {
        try {
            // Clear existing data
            await User.deleteMany({});
            await Thought.deleteMany({});
    
            // Create users
            const users = await User.create(
                Array.from({ length: 6 }, () => ({
                    username: faker.internet.userName(),
                    email: faker.internet.email(),
                }))
            );
    
            // Create thoughts for each user
            await Promise.all(
                users.map(async (user) => {
                    const thoughts = await Thought.create(
                        Array.from({ length: 4 }, () => ({
                            thoughtText: faker.lorem.sentence(),
                            username: user._id,
                        }))
                    );
    
                    // Update user's thoughts array
                    user.thoughts = thoughts.map((thought) => thought._id);
                    await user.save();
                })
            );
    
            // Establish friendships between users
            await Promise.all(
                users.map(async (user) => {
                    // Choose random users as friends (excluding the current user)
                    const friendsCount = Math.floor(Math.random() * 3) + 1; // Random number of friends between 1 and 5
                    const friends = users
                        .filter((u) => u._id.toString() !== user._id.toString())
                        .sort(() => 0.5 - Math.random())
                        .slice(0, friendsCount);
    
                    // Update user's friends array
                    user.friends = friends.map((friend) => friend._id);
                    await user.save();
                })
            );
    
            console.log('Seed data successfully created!');
            process.exit(0);
        } catch (error) {
            console.error('Error seeding data:', error);
            process.exit(1);
        }
    }
    
    // Execute the seed function
    seed();
});