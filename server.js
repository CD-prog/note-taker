const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let notes = [];

const readData = () => {
    let data = fs.readFileSync(path.join(__dirname, './db/db.json'), "utf8");
    notes = JSON.parse(data);
    return notes;
}
const writeData = (notes) => fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(notes), err=>{
    if (err){
        console.log(err)
    }
});

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

app.get('/api/notes', (req, res) => res.json(readData()));

// add new note 
app.post('/api/notes',(req,res)=> {
let data = readData();
let highest = 0;
for (let index = 0; index < data.length; index++) {
    const id = data[index].id;
    if(id > highest){
        highest = id;
    }
}
req.body.id = highest + 1
data.push(req.body);
writeData(data);
res.json(data);
})

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));


// delete  note
app.delete('/api/notes/:id', (req, res) => {
   
    
});


app.listen(PORT, () => console.log(`Server listening at Port: ${PORT}`));
