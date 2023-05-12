import React, { useEffect, useState } from 'react';
import TodoForm from './TodoForm';
import Todos from './Todos';
import axios from 'axios';
import '../../styles/list.scss'

export type Todo = {
	id: number;
	text: string;
	iscomplete: boolean;
	status: string;
};

const TodoList = () => {
	const [todos, setTodos] = useState<Todo[]>([]);

	const getTodos = async () => {
		const response = await axios.get('http://localhost:5000/todos');
		setTodos(response.data);
	};

	useEffect(() => {
		getTodos();
	}, []);

	const addTodo = async (todo: string) => {
		if (todo === '') {
			alert('You must enter something!');
			return;
		}

		const response = await axios
			.post('http://localhost:5000/todos', {
				text: todo,
			})
			.then(result => {
				console.log('successfully added');
				return result;
			});
		setTodos([...todos, response.data]);
	};

	const completeTodo = async (todoGot: Todo) => {
		const response = await axios.put(
			`http://localhost:5000/todos/${todoGot.id}`,
			{
				...todoGot,
				iscomplete: !todoGot.iscomplete,
			}
		);

		const updatedTodos = todos.map((todo: Todo) => {
			if (todoGot.id === todo.id) {
				return { ...response.data };
			}
			return todo;
		});
		setTodos(updatedTodos);
	};

	const removeTodo = async (id: number) => {
		await axios.delete(`http://localhost:5000/todos/${id}`).then(() => {
			console.log('deleted');
		});

		const removeArr = [...todos].filter(todo => todo.id !== id);
		setTodos(removeArr);
	};

	const changeTodo = async (todoGot: Todo, status: string) => {
		const response = await axios.put(
			`http://localhost:5000/todos/${todoGot.id}`,
			{
				...todoGot,
				status: status,
			}
		);

		const updatedItem = todos.map((todo: Todo) => {
			if (todoGot.id === todo.id) {
				return { ...response.data };
			}
			return todo;
		});
		setTodos(updatedItem);
	};

	const updateTodo = async (todoGot: Todo, newValue: string) => {
		if (newValue === '') {
			return;
		}

		const response = await axios.put(
			`http://localhost:5000/todos/${todoGot.id}`,
			{
				...todoGot,
				text: newValue,
			}
		);

		const updatedItem = todos.map((todo: Todo) => {
			if (todoGot.id === todo.id) {
				return { ...response.data };
			}
			return todo;
		});
		setTodos(updatedItem);
	};

	const todoList = todos.map((todo: Todo, index: number) => (
		<Todos
			todos={todo}
			key={todo.id}
			index={index}
			changeTodo={changeTodo}
			completeTodo={completeTodo}
			removeTodo={removeTodo}
			updateTodo={updateTodo}
		/>
	));

	return (
		<div className='container'>
			<h1 className='text-center text-3xl font-bold'>To-do List</h1>
			<TodoForm addTodo={addTodo} />
			<div className='grid grid-flow-col'>
				<h2>Todo</h2>
				<h2>InPro</h2>
				<h2>Review</h2>
				<h2>Done</h2>
			</div>
			<div id='todoList' className='groups'>
				{todoList}
			</div>
		</div>
	);
};

export default TodoList;
