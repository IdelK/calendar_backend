const {mongoose} = require('mongoose');

const dbConnection=async()=>{
    try {
      await  mongoose.connect(process.env.DB_CNN);
      console.log('Connect');
 
        
    } catch (error) {
      //  confirm(error);
      confirm(error) 
        throw new Error('Error connecting to'); 
    }
};

module.exports = {dbConnection};