const mongoose = require("mongoose");

const conectarDB = async () => {
  try {
    console.log("MONGODB_URI:", process.env.MONGODB_URI);

    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`[Base de Datos] MongoDB Conectado con éxito en: ${conn.connection.host}`);
  } catch (error) {
    console.error("=========== ERROR COMPLETO ===========");
    console.error(error);
    console.error("=====================================");
    process.exit(1);
  }
};

module.exports = conectarDB;