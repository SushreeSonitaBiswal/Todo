/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './App.css';

export default function App() {
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('todo'); // 'todo' or 'completed'

  // Handle task submission
  const addTask = () => {
    if (title && description) {
      const newTask = { id: Date.now(), title, description, completed: false };
      setTodos([...todos, newTask]);
      setTitle('');
      setDescription('');
    }
  };

  // Handle task completion

  const toggleCompletion = (taskId) => {
    const updatedTodos = todos.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTodos(updatedTodos);
  };

  // Handle task deletion

  const deleteTask = (taskId) => {
    const updatedTodos = todos.filter(task => task.id !== taskId);
    setTodos(updatedTodos);
  };

  // Filter the task

  const filteredTodos = todos.filter(task => {
    if (filter === 'todo') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className='App'>
      <h1>My Todos</h1>

      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title</label>
            <input
              type="text"
              placeholder="What's the task title?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='todo-input-item'>
            <label>Description</label>
            <input
              type="text"
              placeholder="What's the task description?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className='todo-input-item'>
            <button type="button" className='primaryBtn' onClick={addTask}>
              Add
            </button>
          </div>
        </div>

        <div className='btn-area'>
          <button onClick={() => setFilter('todo')}>Todo</button>
          <button onClick={() => setFilter('completed')}>Completed</button>
        </div>

        <div className='todo-list'>
          {filteredTodos.map(task => (
            <div key={task.id} className={`todo-list-item ${task.completed ? 'completed' : ''}`}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <div>
                <button
                  onClick={() => toggleCompletion(task.id)}
                  className={task.completed ? 'completed' : ''}
                >
                  {task.completed ? 'Mark as Incomplete' : 'Mark as Completed'}
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="deleteBtn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



