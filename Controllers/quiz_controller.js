//importa el modelo de la bbdd
var models=require('../models/models.js');



// get /quizes/question
exports.question=function(req,res){
  // ahora usa la base de datos
  models.Quiz.findAll().success(function(quiz){
      res.render('quizes/question',{pregunta:quiz[0].pregunta});
  })

};

//get /quizes/answer
exports.answer=function(req,res){
  models.Quiz.findAll().success(function(quiz){
    if(req.query.respuesta ===quiz[0].respuesta){
    res.render('quizes/answer',{respuesta:'Correcto'});
  } else {
    res.render('quizes/answer',{respuesta:'Incorrecto'});
  };

  })

};
