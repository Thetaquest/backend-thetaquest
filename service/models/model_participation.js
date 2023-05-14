const mongoose = require('mongoose');

const quizParticipationSchema = new mongoose.Schema({
    participant:{
        type: String,//adress of wallet owner
        required: true
    },
    score:{
        type:Number,
        default:0
    },
    quizSmartContractAddress:{
        type: String,//adress of wallet owner
        required: true
    },
    quizId:{
        type: mongoose.ObjectId,
        required: true,
        ref:'quiz'
    }
})

const QuizParticipation = mongoose.model('quizParticipation',quizParticipationSchema);
export default QuizParticipation;
