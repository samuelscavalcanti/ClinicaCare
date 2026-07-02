const mongoose = require('mongoose');

const dbConfig = {
  isMock: false
};

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/clinicacare';
    console.log('📡 Conectando ao MongoDB...');
    
    // 10 second timeout to accommodate MongoDB Atlas cloud latency
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000
    });
    
    console.log(`✅ MongoDB Atlas Conectado: ${conn.connection.host}`);
    dbConfig.isMock = false;
  } catch (error) {
    console.warn(`⚠️ Erro ao conectar ao MongoDB: ${error.message}`);
    console.warn(`🔄 Habilitando Banco de Dados Em Memória (Mock) para fins de teste/execução!`);
    dbConfig.isMock = true;
  }
};

module.exports = { connectDB, dbConfig };
