module.exports = function (app) {
    var mongooseModel = require("./model.js");

    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname + '/../public/index.html'));
    });

    app.post('/registerUser', function (req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        var user = mongooseModel.user;
        var classRoom = mongooseModel.class;
        var teacher;
        console.log(req.body);
        if(req.body.teacher === "false") {
            teacher = false;
        } else {
            teacher = true;
        }
        var newUser = new user({
            userName: req.body.userName,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            teacher: teacher,
            class: {
                id: req.body.class.id,
                name: req.body.class.name
            }
        });

        user.find({userName: newUser.userName}, function (err, documents) {
            if (err) console.error(err);
            if (documents.length > 0) {
                console.log("User already exists");
                res.status(400).json("A user with this User Name already exist. Please enter a unique User Name");
            } else {
                console.log("User does not exist");
                classRoom.find({id: req.body.class.id},function(err, doc) {
                    if (err) console.error(err);
                    if(doc.length > 0) {
                        console.log("Classroom exists. Check if teacher");
                        if(teacher) {
                            res.status(400).json("A classroom with that ID already exist. Please enter a unique Class ID");
                        } else {
                            newUser.save();
                            res.status(200).json("User Created");
                        }
                    } else {
                        console.log("Classroom Does not Exist");
                        if(teacher) {
                            console.log("Create classroom");
                            var newClass = new classRoom({
                                id: req.body.class.id,
                                teacher: req.body.firstName + " " + req.body.lastName,
                                homeWork:[],
                                toDo:[],
                                wishList:[],
                                messageBoard:[]
                            })
                            newClass.save();
                            newUser.save();
                            res.status(200).json("Your user and classroom has been created");
                        } else {

                            res.status(400).json("You must enter a valid class ID");
                        }
                    }
                })
            }
        })

    });

    app.get('/login', function(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        var user = mongooseModel.user;
        var userName = req.query['userName'];
        var password = req.query['password'];
        console.log("userName: " + userName);
        console.log("password:" + password);

        user.find({userName: userName}, function(err, documents) {
            if(err) console.error(err);
            if(documents.length > 0) {
                console.log("User Exists");
                if(documents[0].password === password) {
                    console.log("Password Match");
                    res.status(200).json(documents[0]);
                } else {
                    console.log("Password Does Not Match");
                    res.status(400).json("Your entered the wrong password");
                }
            } else {
                console.log("User does not exist");
                res.status(400).json("We do not have records of a user with the user name you provided")
            }
        })

    })

};
