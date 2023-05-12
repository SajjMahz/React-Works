import React, { useState } from "react";

export type Tasks = {
  id?: number;
  name: string;
  date: string;
  amount: string;
};

const Form = (props: any) => {
  const [input, setInput] = useState<Tasks>({ name: "", date: "", amount: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.addTask(input);
    setInput({
      name: "",
      date: "",
      amount: "",
    });
  };

  return (
    <div className="text-center text-lg">
      Add a new Item:
      <form className="" onSubmit={handleSubmit}>
        <label htmlFor="name" className="mr-1">
          Name
        </label>
        <input
          className="w-2/4 border border-dark mb-2"
          type="text"
          placeholder="enter your expense"
          name="name"
          onChange={handleChange}
          value={input.name}
        />
        <br />
        <label htmlFor="date" className="mr-1">
          Date
        </label>
        <input
          className="w-1/4 border border-dark"
          type="date"
          name="date"
          onChange={handleChange}
          value={input.date}
        />
        <label htmlFor="amount" className="mr-1">
          {" "}
          Amount
        </label>
        <input
          className="w-1/6 border border-dark"
          type="text"
          name="amount"
          onChange={handleChange}
          value={input.amount}
        />
        <br />
        <button className="button">Submit</button>
      </form>
    </div>
  );
};

export default Form;
