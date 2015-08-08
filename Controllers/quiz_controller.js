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
      res.render('quizes/index.ejs',{quizes: quizes, errors: []});
  }
).catch(function(error){next(error);})

};

// get /quizes/:id
//ojo!! se usa then en vez de success

//se muestran todas las pregutas que hay en la bbdd
exports.show=function(req,res){
  // ahora usa la base de datos
  //models.Quiz.find(req.params.quizId).then(function(quiz){
      res.render('quizes/show',{quiz: req.quiz, errors: []});
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
    res.render('quizes/answer',{quiz: req.quiz,
                                  respuesta: resultado,
                                  errors: []});
  //};

  //}
//)

};

// get /quizes/new
exports.new=function(req,res){
  var quiz= models.Quiz.build(//crea objeto quiz
    {pregunta: "Pregunta", respuesta: "Respuesta"}
  );
      res.render('quizes/new',{quiz: quiz, errors: []});
};

// post /quizes/create

exports.create=function(req, res){
  var quiz = models.Quiz.build ( req.body.quiz );
  //guarda en bbdd los campos pregunta y respuesta de quiz
  quiz
  .validate()
  .then(
    function(err){
      if(err){
       res.render('quizes/new', {quiz: quiz, errors: err.errors});
      }else{
        quiz //save guarda en ddbb los campos pregunta y respuesta de quiz
        .save({fields: ["pregunta", "respuesta"]})
        .then(function(){ res.redirect('/quizes')})
            //Redirección http (url relativo) a lista de preguntas
    }
    }
  );
};

// Get quizes/:id/edit
exports.edit = function (req,res){
  var quiz = req.quiz; //autoload de instancia de quiz
  res.render('quizes/edit', {quiz: quiz, errors: []});
};

//put /quizes/:id
exports.update=function(req, res){
  req.quiz.pregunta = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;

  req.quiz
  .validate()
  .then(
    function(err){
      if(err){
       res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
      }else{
        req.quiz //save guarda en ddbb los campos pregunta y respuesta de quiz
        .save({fields: ["pregunta", "respuesta"]})
        .then(function(){ res.redirect('/quizes');})
            //Redirección http (url relativo) a lista de preguntas
    }
    }
  );
};

//Delete /quizes/:id
exports.destroy=function(req,res){
  req.quiz.destroy().then(function(){
    res.redirect('/quizes');
    }).catch(function(error){next(error);})
};
