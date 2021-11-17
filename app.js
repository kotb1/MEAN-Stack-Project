const express = require('express');
const app = express();
const {mongoose} = require ('./db/mongoose');
const bodyParser = require('body-parser');
const {Task} = require('./db/models/task.module');
const { User } = require('./db/models/user.model');

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );

    next();
});
app.get('/',(req,res)=>{
    res.send("Samo 3aleko");
})


app.listen(3000, () => {console.log("sha8al 3ala server 3000");})
app.get('/tasks/:id',(req,res)=>{
    Task.find({userid: req.params.id}).then((tasks) => 
        {res.send(tasks);
    });
})
app.post('/tasks/:id',(req,res) =>{
    let title2 = req.body.title;
    //let title = "yarab";
    let newtask = new Task();
    newtask.title=title2;
    newtask.userid=req.params.id;
    newtask.save().then((taskDoc)=>{
        res.send(taskDoc);
    })
    
})
app.patch('/tasks/:userid/:taskid', (req, res) => {
    // We want to update the specified list (list document with id in the URL) with the new values specified in the JSON body of the request
    //console.log(req.params.id);
    Task.findOneAndUpdate({ _id: req.params.taskid,userid: req.params.userid}, {
        $set: req.body
    }).then(() => {
        res.send({ message: 'updated successfully'});
    });
});
app.delete('/tasks/:userid/:taskid',(req,res)=>{
    Task.findOneAndRemove({
        _id: req.params.taskid,userid: req.params.userid
    }).then((removedTaskDoc)=> res.send(removedTaskDoc))
})
app.post('/users', (req, res) => {
    // User sign up

    let body = req.body;
    let newUser = new User(body);

    newUser.save().then((userDoc)=>{
        res.send(userDoc);
    });
    //console.log(newUser.email);
    /*.then(() => {
        return newUser.createSession();
    }).then((refreshToken) => {
        // Session created successfully - refreshToken returned.
        // now we geneate an access auth token for the user

        return newUser.generateAccessAuthToken().then((accessToken) => {
            // access auth token generated successfully, now we return an object containing the auth tokens
            return { accessToken, refreshToken }
        });
    }).then((authTokens) => {
        // Now we construct and send the response to the user with their auth tokens in the header and the user object in the body
        res
            .header('x-refresh-token', authTokens.refreshToken)
            .header('x-access-token', authTokens.accessToken)
            .send(newUser);
    }).catch((e) => {
        res.status(400).send(e);
    })*/
})

app.post('/users/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    User.findByCredentials(email, password).then((str)=>{
        res.send(str);
    })
    /*if(User.findByCredentials(email, password))
    {
        return "tmm";
    }
    else
    {
        return "mesh 3ndy";
    }*/
    /*.then((user) => {
        return user.createSession().then((refreshToken) => {
            // Session created successfully - refreshToken returned.
            // now we geneate an access auth token for the user

            return user.generateAccessAuthToken().then((accessToken) => {
                // access auth token generated successfully, now we return an object containing the auth tokens
                return { accessToken, refreshToken }
            });
        }).then((authTokens) => {
            // Now we construct and send the response to the user with their auth tokens in the header and the user object in the body
            res
                .header('x-refresh-token', authTokens.refreshToken)
                .header('x-access-token', authTokens.accessToken)
                .send(user);
        })
    }).catch((e) => {
        res.status(400).send(e);
    });*/
})

/*app.delete('/tasks', (req,res)=>{
    console.log(req.body.id)
    Task.findOneAndRemove({
        _id: req.body.id
    }).then((removedTaskDoc)=> res.send(removedTaskDoc))
})*/
