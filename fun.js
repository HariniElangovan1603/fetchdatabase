
import express from 'express';
import { connection } from './route.js';
import cors from 'cors'

connection.connect();
let app = express();
app.use(cors());
app.use(express.json());
app.set("view engine", 'ejs')



app.get("/", (req, res) => {
    res.send("datas are here")
})
app.get('/projects', (req, res) => {
    connection.query("SELECT * FROM project", (err, data) => {
        if (err) {
            res.send(err, "something is wrong")
        }
        else {
            res.send(data)
            console.log("data connected", data)
        }
    })
})

app.get('/projects/:id', (req, res) => {
    const {id} = req.params
    console.log(id)
    connection.query('SELECT * FROM project WHERE id = ?', [id,], (err, data) => {
        if (err) {
            res.send(err, "something is wrong");
        } else {
            res.send(data);
            console.log("data connected", data);
        }
    });
});



app.post('/projects', (req, res) => {
    let { name, age, phone } = req.body
    connection.query('INSERT into project (name,age,phone)VALUES (?, ?, ?)', [name, age, phone], (err, data) => {
        if (err) {
            res.send(err, "something is wrong");
        } else {
            res.send(data);
            console.log("created data", data);
        }
    });
});


app.put("/projects/:id", (req, res) => {
    let { name, age, phone } = req.body
    const id = req.params.id
    console.log("----UPDATE QUERY----")
    console.log("requet body",req.body);
    console.log("id",id);
    connection.query('UPDATE project SET name=?,age=?,phone=? WHERE id=?', [name, age, phone,id], (err, data) => {
        if (err) {
            res.send(err, "something is wrong");
        
        } else {
            res.send(data);
            
            console.log("update data successfully", data);
        }
    });
});


app.delete('/projects/:id', (req, res) => {
    const id = req.params.id
    connection.query('DELETE FROM project WHERE id = ?',[id], (err, data) => {
        if (err) {
            res.send(err, "something is wrong");
        } else {
            res.send(data);
            console.log("deleted data successfully", data);
        }
    });
});



app.listen(3002, () => console.log("http://localhost:3002"));



