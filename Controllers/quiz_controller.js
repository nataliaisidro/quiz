//importa el modelo de la bbdd
var models=require('../models/models.js');


//ahora hay mas preguntas en la bbdd
//se necesita un identificador para acceder a ellas

//autoload - factoriza el código si ruta icluye :quizId
exports.load=function(req,res,next,quizId){
  models.Quiz.find(quizId).then(
    function(quiz){
      if (quiz){
        req.quiz=quiz;
        next();
      }else {next (new Error('No existe quizId=' + quizId));}
    }//fin function
  ).catch(function(error){next(error);});
};

//Get/quizes
exports.index=function(req,res){
  // ahora usa la base de datos
  models.Quiz.findAll().then(function(quizes){
      res.render('quizes/index',{quizes: quizes});
  }
).catch(function(error){next(error);})

};

// get /quizes/:id
//ojo!! se usa then en vez de success
exports.show=function(req,res){
  // ahora usa la base de datos
  //models.Quiz.find(req.params.quizId).then(function(quiz){
      res.render('quizes/show',{quiz: req.quiz});
  //})

};

//get /quizes/id:answer
exports.answer=function(req,res){
  //utilizamos una variable para almacenar el resultado
  var resultado='Incorrecto';
//models.Quiz.find(req.params.quizId).then(function(quiz){
    if(req.query.respuesta ===req.quiz.respuesta){
    //res.render('quizes/answer',{quiz: quiz, respuesta:'Correcto'});
    resultado='Correcto';
  }
  //else {
    res.render('quizes/answer',{quiz: req.quiz, respuesta: resultado});
  //};

  //}
//)

};
