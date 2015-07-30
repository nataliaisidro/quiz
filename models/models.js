var path=require('path');

//meter los datos de la bbdd
//Postgres DATABASE_URL = Postgres://user:passwd@host_port/database
//SQLite DATABASE_URL =sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6]||null);
var user= (url[2]||null);
var pwd= (url[3]||null);
var protocol= (url[1]||null);
var dialect= (url[1]||null);
var port= (url[5]||null);
var host= (url[4]||null);
var storage = process.env.DATABASE_STORAGE;

//se carga modelo ORM
var Sequelize=require('sequelize');

//usar ddbb sqlite o Postgres
var sequelize = new Sequelize(DB_name,user,pwd,
  {
    dialect: protocol,
    protocol: protocol,
    port: port,
    host: host,
    storage: storage, //solo SQLite (.env)
    omitNull: true //solo Postgress
  });

//se usa la bbdd SQLite:
//var sequelize=new Sequelize(null,null,null,
//  {dialect:"sqlite",storage: "quiz.sqlite"});

  //se importa la definicion de la tabla Quiz en quiz.js
  //var Quiz= sequelize.import(path.join(__dirname,'quiz'));

  //importa la definicion de la tabla Quiz
  var quiz_path = path.join(__dirname,'quiz');
  var Quiz= sequelize.import(quiz_path);

  exports.Quiz=Quiz; //exporta la definicon de la tabla Quiz

  //creamos e inicializamos la tabla de preguntas en la bbdd
  sequelize.sync().success(function()
                {
                  Quiz.count().success(function(count){
                    //mira numero de filas de la tabla, si es cero se inicializa
                      if(count===0){Quiz.create({pregunta: 'Capital de Italia',
                                                  respuesta: 'Roma'
                    })
                  .success(function(){console.log('Base de datos inicializada')})
                };

              });
            });
