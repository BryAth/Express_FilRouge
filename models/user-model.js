const {Schema,model} = require ('mongoose');

//Creation du Schema
const userSchema = new Schema({
pseudo :{
    type : String,
    required : true,
    unique : true,
    trim : true
},

email : {
    type : String,
    required : true,
    unique : true,
    trim : true
},
password : {
    type : String,
    required : true,
    trim : true
},
firstname : {
    type : String,
    required : true,
    unique : true
},
lastname : {
    type : String,
    required : true,
    trim : true
},
role:{
    type : String,
    enum : ['User','Moderator','Admin'],
    required : true,
    default : 'User'
}





},{
    collection : "User",
    timestamps : true,

});


//Création d'un model User à partir du userSchema
const User = model('User',userSchema)
module.exports = User;