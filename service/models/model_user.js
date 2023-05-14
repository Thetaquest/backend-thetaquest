const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    walletAddress:{
        type: String,
        required: true
    },
    wonQuiz:{
        type: [mongoose.ObjectId],
        ref:'quiz'
    }
})

const User = mongoose.model('user',userSchema);
export default User;
