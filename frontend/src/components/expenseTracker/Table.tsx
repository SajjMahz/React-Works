import React, { useState, useEffect } from 'react';
import Form, { Tasks } from './Form';
import TableEmptyMsg from './TableEmptyMsg';
import Axios from 'axios';
import '../../styles/table.scss';

const Table = () => {
  const [tasks, setTasks] = useState<Tasks[]>([]);

  const getExpenses = async () => {
    const response = await Axios.get('http://localhost:5000/expenseTracker');
    setTasks(response.data);
  };

  useEffect(() => {
    getExpenses();
  }, []);

  const addTask = async (input: Tasks) => {
    if (input.name === '' || input.date === '' || input.amount === '') {
      alert("Don't leave empty!");
      return;
    }

    const response = await Axios.post('http://localhost:5000/expenseTracker', {
      name: input.name,
      date: input.date,
      amount: input.amount,
    }).then((result) => {
      console.log('success');
      return result;
    });
    setTasks([...tasks, response.data]);
  };

  const removeTask = async (id: number) => {
    await Axios.delete(`http://localhost:5000/expenseTracker/${id}`).then(
      () => {
        console.log('deleted');
      }
    );

    const removeTsk = [...tasks].filter((task) => task.id !== id);
    setTasks(removeTsk);
  };

  return (
    <div>
      <Form addTask={addTask} />
      <br />
      <table className='text-center'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <TableEmptyMsg tasks={tasks} />
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.name}</td>
              <td>{task.date}</td>
              <td>${task.amount}</td>
              <td>
                <button id="butn" style={{ background: '#f0ad4e' }}>
                  Edit
                </button>
              </td>
              <td>
                <button
                  id="butn"
                  style={{ background: 'red' }}
                  onClick={() => removeTask(task.id as number)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
