import React from 'react';
import { Tasks } from './Form';

interface IProps {
  tasks: Tasks[];
}

const TableEmptyMsg = ({ tasks }: IProps) => {
  if (tasks.length === 0) {
    return (
      <tr>
        <th colSpan={5}>No Expenses added</th>
      </tr>
    );
  } else {
    return null;
  }
};

export default TableEmptyMsg;
