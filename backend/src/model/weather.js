const mongoose = require('mongoose');
const { Schema } = mongoose;

const weatherSchema = new Schema({
    weather : {
        type: Array
    },
    locations : {
        type : Array
    },
    user_id: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    created_at :{
        type : Date,
        default : Date.now()
    },
    status : {
        type : String,
        enum : ['user','default']
    }
});

module.exports = mongoose.model('weather', weatherSchema)