const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

app.use(cors());
app.use(express.json());

//Routes todoList:

app.post('/todos', async (req, res) => {
    try {
        const { text } = req.body;
        const newTodo = await pool.query("INSERT INTO todos (text) VALUES($1) RETURNING *", [text]
        );

        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/todos', async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todos ORDER BY id ASC");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;
        const { status } = req.body;
        const { iscomplete } = req.body;

        const updateTodo = await pool.query("UPDATE todos SET text = $1, status = $2, iscomplete = $3 WHERE id = $4 RETURNING *", [text, status, iscomplete, id]);

        res.json(updateTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todos WHERE id = $1", [id]);

        res.json(deleteTodo);
    } catch (err) {
        console.error(err.message);
    }
});

//Routes expenseTracker:
app.post('/expenseTracker', async (req, res) => {
    try {
        const { name } = req.body;
        const { date } = req.body;
        const { amount } = req.body;

        const newExpense = await pool.query('INSERT INTO expense_tracker (name, date, amount) VALUES ($1,$2,$3) RETURNING *', [name, date, amount]);
        res.json(newExpense.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/expenseTracker', async (req, res) => {
    try {
        const allExpenses = await pool.query("SELECT * FROM expense_tracker ORDER BY id ASC");
        res.json(allExpenses.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.delete('/expenseTracker/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM expense_tracker WHERE id = $1", [id]);

        res.json(deleteTodo);
    } catch (err) {
        console.error(err.message);
    }
});



app.listen(5000, () => {
    console.log('Server has started on port 5000')
});