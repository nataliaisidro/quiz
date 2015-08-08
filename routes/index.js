var express = require('express');
var router = express.Router();
var quizController = require('../Controllers/quiz_controller.js');
var creditos = require('../Controllers/credits.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

//Autoload de comandos con :quizId
router.param('quizId', quizController.load);

//rutas de /quizes
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)',quizController.show);

router.get('/quizes/:quizId(\\d+)/answer',quizController.answer);

router.get('/quizes/new', quizController.new);
router.post('/quizes/create', quizController.create);

router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);
router.put('/quizes/:quizId(\\d+)', quizController.update);
router.delete('/quizes/:quizId(\\d+)', quizController.destroy);

router.get('/author', creditos.author);


module.exports = router;
