import React, { useState, useEffect, useRef } from 'react';
import '../../styles/list.scss';

interface AddTodoProps {
	addTodo: (todo: string) => Promise<void>;
}

const TodoForm = ({ addTodo }: AddTodoProps) => {
	const [input, setInput] = useState('');

	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		inputRef.current?.focus();
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		addTodo(input);
		setInput('');
	};

	return (
		<div className='container'>
			<form className='form' onSubmit={handleSubmit}>
				<input
					id='inp'
					placeholder='Add a todo'
					name='text'
					value={input}
					onChange={handleChange}
					ref={inputRef}
				/>
				<button type='submit' id='btn'>
					Add
				</button>
			</form>
		</div>
	);
};

export default TodoForm;
