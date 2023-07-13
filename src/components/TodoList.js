// TodoList.js
import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ tasks, onDelete, onCompletionChange }) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onDelete={() => onDelete(task.id)}
          onCompletionChange={() => onCompletionChange(task.id)}
        />
      ))}
    </ul>
  );
}

export default TodoList;
