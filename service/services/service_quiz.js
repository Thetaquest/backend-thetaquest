const Quiz = require("../models/model_quiz");
const User = require("../models/model_user");

exports.createQuiz = async (teacher,title,description,category) => {
    const quiz = await Quiz.create({
        owner:teacher,
        title,
        description,
        category
    })

    return quiz
}

exports.hostQuiz = async (
    quizId,
    quizContractAddress,
    quizTime,
    entrancePriceTfuel,
    startDate,
    endDate,
    questionTimer,
    randomQuestionOrder,
    randomOptionOrder,
    name,
    description
) => {
    
    const hosted_quiz = await Quiz.updateOne({
        _id:quizId
    },{
        quizContractAddress,
        quizTime,
        entrancePriceTfuel,
        startDate,
        endDate,
        questionTimer,
        randomQuestionOrder,
        randomOptionOrder,
        name,
        description,
        hosted: true
    })
    return hosted_quiz;
}

exports.quizAlredyHosted = async (quizAddress) => {
    const quiz = await Quiz.find({quizContractAdress:quizAddress});
    if(quiz.length>0){
        return true
    }else{
        return false
    }
}

exports.getTeacherHostedQuizAddress = async (teacherAddress) => {
    const quizes = await Quiz.find({
        owner: teacherAddress
    })
    return quizes
}

exports.getTeacherHostedQuizName = async(teacherName) => {
    //get name teacher id
    const user = await User.findOne({name:teacherName})
    //get quizes
    const quizes = await Quiz.find({
        owner: user.walletAddress
    })
    return quizes
}

exports.getQuizDataAddress = async(quizAddress)=>{
    const quizdata = await Quiz.findOne({
        quizContractAdress: quizAddress
    })
    return quizdata
}

exports.getQuizDataId = async(quizId)=>{
    const quizdata = await Quiz.findOne({
        _id: quizId
    })
    return quizdata
}

exports.quizChooseWinners = async(quizAddress)=>{

}