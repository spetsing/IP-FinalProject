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


    app.post('/addHomework', function(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        var classRoom = mongooseModel.class;

        var newHomework = {
            date: req.body.date,
            description: req.body.description
        }

        console.log(newHomework);

        classRoom.find({id:req.body.id},function(err, documents) {
            if(err) console.error(err);
            if(documents.length > 0) {
                documents[0].homeWork.push(newHomework);
                documents[0].save();
                console.log("New Homework Saved");
                res.status(200).json(documents[0]);
            } else {
                res.status(400).json("I Cannot find a class with the ID provided");
            }
        })
    })

    app.get('/getHomework', function(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        var classRoom = mongooseModel.class;
        var id = req.query['id'];

        classRoom.find({id:id}, function(err, documents) {
            if(err) console.error(err);
            if(documents.length > 0) {
                res.status(200).json(documents[0].homeWork);
            } else {
                res.status(400).json("Could not a find a class with the ID provided");
            }
        })
    })

    app.post('/addMessage', function(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        var classRoom = mongooseModel.class;

        var newMessage = {
            date: req.body.date,
            description: req.body.description,
            userName: req.body.userName
        }

        console.log(newMessage);

        classRoom.find({id:req.body.id},function(err, documents) {
            if(err) console.error(err);
            if(documents.length > 0) {
                documents[0].messageBoard.push(newMessage);
                documents[0].save();
                console.log("New Homework Saved");
                res.status(200).json(documents[0]);
            } else {
                res.status(400).json("I Cannot find a class with the ID provided");
            }
        })
    })


    app.get('/getMessageBoard', function(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        var classRoom = mongooseModel.class;
        var id = req.query['id'];

        classRoom.find({id:id}, function(err, documents) {
            if(err) console.error(err);
            if(documents.length > 0) {
                res.status(200).json(documents[0].messageBoard);
            } else {
                res.status(400).json("Could not a find a class with the ID provided");
            }
        })
    })

    app.post('/addToDo', function(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        var classRoom = mongooseModel.class;

        var newToDo = {
            id: req.body.id,
            date: req.body.date,
            description: req.body.description,
            markedCompleted:[]
        }

        console.log(newToDo);

        classRoom.find({id:req.body.classID},function(err, documents) {
            if(err) console.error(err);
            if(documents.length > 0) {
                documents[0].toDo.push(newToDo);
                documents[0].save();
                console.log("New ToDo Saved");
                res.status(200).json(documents[0]);
            } else {
                res.status(400).json("I Cannot find a class with the ID provided");
            }
        })
    })


    app.get('/getToDoList', function(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        var classRoom = mongooseModel.class;
        var id = req.query['id'];

        classRoom.find({id:id}, function(err, documents) {
            if(err) console.error(err);
            if(documents.length > 0) {
                res.status(200).json(documents[0].toDo);
            } else {
                res.status(400).json("Could not a find a class with the ID provided");
            }
        })
    })

    app.post('/markCompletedToDo', function(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        var classRoom = mongooseModel.class;
        var id = req.body.classID;
        console.log(req.body);

        classRoom.find({id:id},function(err, documents) {
            if(err) console.error(err);
            if(documents.length > 0) {
                for(var x = 0; x < documents[0].toDo.length;x++) {
                    console.log(documents[0].toDo[x].id + "     " + req.body.id);
                    if(documents[0].toDo[x].id === req.body.id) {
                        documents[0].toDo[x].markedCompleted.push(req.body.userName);
                        console.log(documents[0].toDo[x].markedCompleted);
                    }
                }
                documents[0].markModified('toDo');
                documents[0].save();
                res.status(200).json("Added user to completed");
            } else {
                res.status(400).json("Could not find a class with that ID");
            }
        })
    })


     app.post('/addWishList', function(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        var classRoom = mongooseModel.class;

        var newWishListItem = {
            id: req.body.id,
            description: req.body.description,
            parentAssigned:"none"
        }

        console.log(newWishListItem);

        classRoom.find({id:req.body.classID},function(err, documents) {
            if(err) console.error(err);
            if(documents.length > 0) {
                documents[0].wishList.push(newWishListItem);
                documents[0].save();
                console.log("WishList Saved");
                res.status(200).json(documents[0]);
            } else {
                res.status(400).json("I Cannot find a class with the ID provided");
            }
        })
    })


    app.get('/getWishList', function(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        var classRoom = mongooseModel.class;
        var id = req.query['id'];

        classRoom.find({id:id}, function(err, documents) {
            if(err) console.error(err);
            if(documents.length > 0) {
                res.status(200).json(documents[0].wishList);
            } else {
                res.status(400).json("Could not a find a class with the ID provided");
            }
        })
    })

    app.post('/singUpWishList', function(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        var classRoom = mongooseModel.class;
        var id = req.body.classID;
        console.log(req.body);

        classRoom.find({id:id},function(err, documents) {
            if(err) console.error(err);
            if(documents.length > 0) {
                for(var x = 0; x < documents[0].wishList.length;x++) {
                    console.log(documents[0].wishList[x].id + "     " + req.body.id);
                    if(documents[0].wishList[x].id === req.body.id) {
                        documents[0].wishList[x].parentAssigned = req.body.userName;
                        console.log(documents[0].toDo[x].markedCompleted);
                    }
                }
                documents[0].markModified('wishList');
                documents[0].save();
                res.status(200).json(documents[0].wishList);
            } else {
                res.status(400).json("Could not find a class with that ID");
            }
        })
    })

};
