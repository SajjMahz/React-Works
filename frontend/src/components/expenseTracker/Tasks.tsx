import React from 'react';

const Tasks = ({ tasks, removeTask }: any) => {
  return (
    <tr>
      <td>{tasks.Name}</td>
      <td>{tasks.Date}</td>
      <td>${tasks.Amount}</td>
      <td>
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => {
            removeTask(tasks.id);
          }}
        >
          X
        </span>
      </td>
    </tr>
  );
};

export default Tasks;
