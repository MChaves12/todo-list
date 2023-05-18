const { Schema, model } = require('mongoose');

const userSchema = new Schema ({
    username: {
        type: String,
        required: [true, "You must provide a username"],
        unique: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    },

    todos: {
        type: [ Schema.Types.ObjectId ],
        ref: 'Todos'
    }
    
})