const express = require("express");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

 

let data = [
    {
        id: 0,
        username: 'Edwin',
        lastname: 'Acuña',
        password: '112358'    
    },
    {
        id: 1,
        username: 'Victor',
        lastname: 'Fernandez',
        password: '112358'    
    }
];

let count = data.length;

app.get('/get_all', function (req, res) {
    res.send(data);
});

app.get('/get/:id', function (req, res) {
    let queryId = parseInt(req.params.id);
    let queryIndex = data.findIndex(user => user.id === queryId)

    console.log(queryIndex + ' ' + queryId);
    if (queryIndex >= 0)
        res.send(data[queryIndex]);
    else 
        res.send('[-] Not found');
});

app.post('/user', function (req, res) {
    username = req.body.username; 
    lastname = req.body.lastname; 
    password = req.body.password;

    data.push({
        id: count++,
        username: username,
        lastname: lastname,
        password: password
    });

    res.send('[+] Correct insert');
});

app.put('/user/:id', function (req, res) {
    id = parseInt(req.params.id);
    username = req.body.username; 
    lastname = req.body.lastname; 
    password = req.body.password;


    let queryIndex = data.findIndex(user => user.id === id);

    if (queryIndex >= 0) {
        data[queryIndex].username = username != undefined ? username : data[queryIndex].username;
        data[queryIndex].lastname = lastname != undefined ? lastname : data[queryIndex].lastname;
        data[queryIndex].password = password != undefined ? password : data[queryIndex].password;
        res.send('[+] Correct update');
    } else {
        res.send('[-] Cannot update');
    }
});

app.patch('/user/:id', function (req, res) {
    id = parseInt(req.params.id);
    username = req.body.username; 
    lastname = req.body.lastname; 
    password = req.body.password;

    let queryIndex = data.findIndex(user => user.id === id);

    if (queryIndex >= 0) {
        data[queryIndex].username = username != undefined ? username : data[queryIndex].username;
        data[queryIndex].lastname = lastname != undefined ? lastname : data[queryIndex].lastname;
        data[queryIndex].password = password != undefined ? password : data[queryIndex].password;
        res.send('[+] Correct update');
    } else {
        res.send('[-] Cannot update');
    }
});

app.delete('/user/:id', function (req, res) {
    let idDeleted = parseInt(req.params.id);

    let dataTemp = data.filter((item) => {
        return item.id !== idDeleted;
    });

    data = [];
    data = dataTemp;

    res.send('[+] Correct deleted');
});

app.listen(3000, () => {
 console.log("El servidor está escuchando en el puerto 3000");
});