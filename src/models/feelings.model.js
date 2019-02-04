// feelings-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const feelings = new Schema({
    mood: { 
        type: String, // text
        required: true 
    },
    anxiety:{
        type: Number, // scale from 1 to 10
        required: true
    },
    stress:{
        type: Number, // scale from 1 to 10
        required: true
    },
    contentment:{
        type: Number, // scale from 1 to 10
        required: true
    },
    productivity:{
        type: Number, // scale from 1 to 10
        required: true
    },
    fitness:{
        type: Boolean, // true or false
        required: true
    }
  }, {
    timestamps: true
  });

  return mongooseClient.model('feelings', feelings);
};