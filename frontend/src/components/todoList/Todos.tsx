import React, { useState } from 'react';
import { Todo } from './TodoList';

interface IProps {
	todos: Todo;
	index: number;
	changeTodo: (todoGot: Todo, status: string) => Promise<void>;
	completeTodo: (todoGot: Todo) => Promise<void>;
	removeTodo: (id: number) => Promise<void>;
	updateTodo: (todoGot: Todo, newValue: string) => Promise<void>;
}

const Todos = ({
	todos,
	index,
	changeTodo,
	completeTodo,
	removeTodo,
	updateTodo,
}: IProps) => {
	const [newInput, setNewInput] = useState('');
	const [status, setStatus] = useState(todos.status);
	var area = '';
	index++;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewInput(e.target.value);
	};

	const handleStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setStatus(e.target.value);

		changeTodo(todos, e.target.value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		updateTodo(todos, newInput);
		setNewInput('');
		setEditing(false);
	};

	if (todos.status === 'todo') {
		area = `${index} / 1`;
	} else if (todos.status === 'inPro') {
		area = `${index} / 2`;
	} else if (todos.status === 'review') {
		area = `${index} / 3`;
	} else {
		area = `${index} / 4`;
	}

	const [Editing, setEditing] = useState(false);

	const editingTemplate = (
		<div className='list' style={{ gridArea: area }}>
			<form className='fourm' onSubmit={handleSubmit}>
				<input
					type='text'
					placeholder={todos.text}
					value={newInput}
					onChange={handleChange}
				/>
				<div>
					<button
						id='butn'
						type='button'
						onClick={() => {
							setNewInput(todos.text);
							setEditing(false);
						}}
					>
						Cancel
					</button>
					<button id='butn' type='submit'>
						Update
					</button>
				</div>
			</form>
		</div>
	);

	const viewTemplete = (
		<div className='list' style={{ gridArea: area }}>
			<div className={todos.iscomplete ? 'done' : 'text'}>
				<div key={todos.id} onClick={() => completeTodo(todos)}>
					{todos.text}
				</div>
			</div>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<div>
					Status:
					<select value={status} onChange={handleStatus} className='border'>
						<option value='todo'>Todo</option>
						<option value='inPro'>In Pro</option>
						<option value='review'>Review</option>
						<option value='done'>Done</option>
					</select>
				</div>
				<div>
					<button
						id='butn'
						type='button'
						onClick={() => {
							setEditing(true);
						}}
					>
						Edit
					</button>
					<button
						id='butn'
						type='button'
						style={{ background: 'red' }}
						onClick={() => {
							removeTodo(todos.id);
						}}
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);

	return Editing ? editingTemplate : viewTemplete;
};

export default Todos;
