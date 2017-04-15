var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    userName: String,
    firstName: String,
    lastName: String,
    password: String,
    teacher: Boolean,
    class: {
        id: String,
        name: String
    }
},{collection:"users"})
var user = mongoose.model("User", userSchema);

var classSchema = new Schema({
    id: String,
    teacher: String,
    homeWork:[],
    toDo:[],
    wishList:[],
    messageBoard:[]
},{collection:"classRooms"})
var classRoom = mongoose.model("ClassRoom", classSchema);






module.exports = {
    user: user,
    class: classRoom
}
