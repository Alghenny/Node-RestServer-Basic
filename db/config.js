const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        
        await mongoose.connect( process.env.MONGODB_CNN );

        console.log('Database Connected');

    } catch (error) {
        console.log(error);
        throw new Error('Error in database connection');
    }

}



module.exports = {
    dbConnection
}