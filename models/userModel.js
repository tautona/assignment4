const mongoose= require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema({
  username: {type:String, required:true},
  firstUnit:{type:Number},
  secondUnit:{type:Number},
  favTopic:{type:String},//  will be used later :-)
  createdAt: {type: Date},
  updatedAt: {type: Date}
});
// check if this is a create or an update and set the appropriate value
schema.pre('save',function(next){
  if (!this.createdAt){
  this.createdAt = new Date();
}else{
  this.updatedAt = new Date();
}
next();
});

// export model with name and schema
module.exports = mongoose.model("User", schema);
