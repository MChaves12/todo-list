const mongoose = require('mongoose');

const DB_URI = process.env.MONGO_URI;

const connect = async () => {
    console.log('Connecting to database...');
    try {
        if(!DB_URI) {
            throw new Error('Database not found');
        };

        const x = await mongoose.connect(DB_URI);
        const toDoListDb = x.connections[0].name;
        console.log(`Databse connected: ${toDoListDb}`);
    } catch (error) {
        console.log('Database connection failed:', error);
        process.exit();
    }
}

connect();