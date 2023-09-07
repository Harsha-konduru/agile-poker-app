
const mongoose = require("mongoose");

async function connect_Db() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
    
        console.log(`MongoDB Connected: ${conn.connection.host}`);
      } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit();
      }
}

module.exports = connect_Db;