import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Header } from './Header';
import { TaskList } from './TaskList';
import { TaskInput } from './TaskInput';

const LOCAL_STORAGE_KEY = "taskList";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<{ id: string; text: string; completed: boolean }[]>([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const addTask = (text: string) => {
    const newTask = { id: `id-${Math.random().toString(36).substr(2, 9)}`, text, completed: false };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...tasks, newTask]));
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };
  
  return (
    <Container>
      <Border>
        <Header />
        <TaskList tasks={tasks} addTask={setTasks} deleteTask={deleteTask} />
        <TaskInput addTask={addTask} />
      </Border>
    </Container>
  );
};

export default App;

const Container = styled.div`
  background-color: #70ce70;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Border = styled.div`
  background-color: white;
  padding: 28px 20%;
  margin: 44px;
  border-radius: 20px;
  width: 100%;
  height: 80%;
  overflow-y: auto;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  scroll-behavior: smooth;

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;

  @media screen and (max-width: 480px){
    padding: 28px;
    margin: 24px;
  }
`;


