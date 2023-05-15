const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    walletAddress:{
        type: String,
        required: true
    },
    wonQuiz:{
        type: [mongoose.ObjectId],
        ref:'quiz'
    },
    name:{
        type: String,
    },
    email:{
        type: String,
    }
})

const User = mongoose.model('user',userSchema);
module.exports = User;
