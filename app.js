// npm init -y
// npm i express ejs body-parser nodemon --save

// Step 1: Import Required Modules : express, ejs, body-parser, nodemon
// ejs and nodemon are embedded (no need for 'require')
const express = require('express');
const bodyParser = require('body-parser');
const port = 3001;

// Step 2: Create the Express Application 
const app = express();

// Step 3: Setting the view engine
app.set('views', './views');
app.set('view engine', 'ejs');

// Step 4: Configuring the body parsing
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('./public/style.css'));

let tasks = [];

// Step 5: Serve the static files
app.get('/', (req, res) => {
    res.render('index', { tasks });
});

app.post('/addTask', (req, res) => {
    const newTask = req.body.task;
    tasks.push({ id: Date.now(), text: newTask });
    console.log(tasks);
    res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(task => task.id === taskId);
    res.render('edit', { task });
});

app.post('/edit/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const updatedText = req.body.task;
    const task = tasks.find(task => task.id === taskId);
    /* const index = tasks.findIndex(i => i.id === taskId);
    console.log(index); */
    if (task) {
        task.text = updatedText;
    }
    console.log(task)
    res.redirect('/');
});

app.get('/delete/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.filter(task => task.id === taskId);
    res.render('/', { task });
});

app.post('/delete/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(task => task.id === taskId);
    const index = tasks.findIndex(i => i.id === taskId);
    console.log(index);
    if (task) tasks.splice(index, index+1);
    else res.status(404).json({ message: 'Task not found' });
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});