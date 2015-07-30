//Definición del modelo de la tabla quiz
//DOS COLUMNAS: PREGUNTA Y RESPUESTA

module.exports=function(sequelize, DataTypes){
  return sequelize.define('Quiz',
            {
              pregunta: DataTypes.STRING,
              respuesta: DataTypes.STRING,
            }

  );

}
