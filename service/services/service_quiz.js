const Quiz = require("../models/model_quiz");
const User = require("../models/model_user");
const service_participations = require('../services/service_participation')
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
    quizContractAdress,
    quizTime,
    entrancePriceTfuel,
    startDate,
    endDate,
    questionTimer,
    randomQuestionOrder,
    randomOptionOrder,
    name,
    description,
    prizes
) => {
    const winners = [];
    prizes.map(prize=>{
        winners.push({
            winner:"tbd",
            prizeTfuel:prize
        },)
    })
    const hosted_quiz = await Quiz.updateOne({
        _id:quizId
    },{
        quizContractAdress:quizContractAdress,
        quizTime,
        entrancePriceTfuel,
        startDate,
        endDate,
        questionTimer,
        randomQuestionOrder,
        randomOptionOrder,
        name,
        description,
        hosted: true,
        winners
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

exports.quizChooseWinners = async(quizAddress,quizTeacherAddr)=>{
    //not enough but minium validation
    const quizData = await Quiz.findOne({
        quizContractAdress: quizAddress
    })
    if(!quizData || quizData.owner!=quizTeacherAddr){
        return 'error'
    }
    
    //get highed score participations
    const high_scores = await service_participations.getBestParticipations(quizData._id,quizData.winners.length)
    console.log(high_scores)
    //mix high_scores and prizes

    //update winners field on quiz schema

}