var express = require('express');
var router = express.Router();
var quizController = require('../Controllers/quiz_controller.js');
var creditos = require('../Controllers/credits.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

router.get('/quizes/question',quizController.question);

router.get('/quizes/answer',quizController.answer);



router.get('/author', creditos.author);



module.exports = router;
