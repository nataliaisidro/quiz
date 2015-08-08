//Definición del modelo de la tabla quiz
//Con validacion
//DOS COLUMNAS: PREGUNTA Y RESPUESTA

module.exports=function(sequelize, DataTypes){
  return sequelize.define('Quiz',
            {
              pregunta: {
                type: DataTypes.STRING,
                validate: {notEmpty: {msg: "--> Pregunta"}}
              },
              respuesta: {
                type: DataTypes.STRING,
                validate: {notEmpty: {msg: "--> Respuesta"}}
              }
            }
  );
}
