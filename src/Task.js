import React, { useState, useEffect } from 'react';
import './TodoApp.css';
import { fetchTasks, addTask, deleteTask, updateTaskCompletion } from './services/taskService';
import TodoList from './components/TodoList';

function Task() {
  const [tasks, setTasks] = useState([]);
  const [inputTitle, setInputTitle] = useState('');
  const [inputDescription, setInputDescription] = useState('');

  useEffect(() => {
    fetchTasksData();
  }, []);

  const fetchTasksData = async () => {
    try {
      const tasksData = await fetchTasks();
      setTasks(tasksData);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (inputTitle.trim()) {
      try {
        const newTask = {
          title: inputTitle.trim(),
          description: inputDescription.trim(),
          isDone: false,
        };
        // maybe add some error handling here 
         await addTask(newTask);
        await fetchTasksData();
        setInputTitle('');
        setInputDescription('');
        e.target.reset()
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const handleTaskDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleTaskCompletionChange = async (id) => {
    try {
      const updatedTasks = tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            isDone: !task.isDone,
          };
        }
        return task;
      });

      await updateTaskCompletion(id, updatedTasks.find((task) => task.id === id).isDone);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating task completion:', error);
    }
  };

  const handleTitleChange = (e) => {
    setInputTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setInputDescription(e.target.value);
  };

  return (
    <div className="app">
      <h1>Task List</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={inputTitle}
          onChange={handleTitleChange}
          placeholder="Enter a title"
          className="input-field"
        />
        <textarea
          value={inputDescription}
          onChange={handleDescriptionChange}
          placeholder="Enter a description"
          className="input-field"
        />
        <button type="submit" className="add-button">Add Task</button>
      </form>
      {tasks && tasks.length > 0 ? (
        <TodoList
          tasks={tasks}
          onDelete={handleTaskDelete}
          onCompletionChange={handleTaskCompletionChange}
        />
      ) : (
        <p>No tasks found.</p>
      )}
    </div>
  );
}

export default Task;
