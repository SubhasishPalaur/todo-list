import React from 'react';
import styled from 'styled-components';
import { useFilter } from '../FilterContext';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import ClearIcon from '@mui/icons-material/Clear';

interface TaskListProps {
  tasks: { id: string; text: string; completed: boolean }[];
  addTask: React.Dispatch<React.SetStateAction<{ id: string; text: string; completed: boolean }[]>>;
  deleteTask: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, addTask, deleteTask }) => {
  const { filter, searchQuery } = useFilter(); 

const getFilteredTasks = () => {
  let filteredTasks = tasks;

  // Filter by status (All, Completed, Incomplete)
  if (filter === 'Completed') {
    filteredTasks = filteredTasks.filter(task => task.completed);
  } else if (filter === 'Incomplete') {
    filteredTasks = filteredTasks.filter(task => !task.completed);
  }

  // Filter by search query
  if (searchQuery) {
    filteredTasks = filteredTasks.filter(task => 
      task.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return filteredTasks;
};

const toggleTaskCompletion = (id: string) => {
  addTask(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
};

const filteredTasks = getFilteredTasks();


  return (
    <TaskContainer>
      {filteredTasks && filteredTasks.length > 0 ? (
        filteredTasks.map(task => (
          <TaskItem key={task.id} completed={task.completed}>
            <TaskCheckbox onClick={() => toggleTaskCompletion(task.id)}>
              {task.completed ? <CheckCircleOutlineIcon style={{width: '16px', color: '#70ce70'}}/> : 
              <RadioButtonUncheckedIcon style={{width: '16px', color: 'rgba(146, 176, 155, 0.34)'}}/>}
            </TaskCheckbox>
            <TaskText>{task.text}</TaskText>
            <ClearIcon style={{width: '16px', color: 'rgba(146, 176, 155, 0.34)'}} onClick={() => deleteTask(task.id)}/>
          </TaskItem>
        ))
      ) : (
        <NoTaskMessage>No tasks available</NoTaskMessage>
      )}
    </TaskContainer>
  );
};

const TaskContainer = styled.div`
  margin-bottom: 20px;
`;

const TaskItem = styled.div<{ completed: boolean }>`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid ${({ completed }) => (completed ? '#d4edda' : 'rgba(146, 176, 155, 0.34)')};;
  margin-bottom: 10px;
  background-color: ${({ completed }) => (completed ? '#d4edda' : '#f8f9fa')};
`;

const TaskCheckbox = styled.span`
  display: flex;
  align-item: center;
  font-size: 24px;
  margin-right: 10px;
  cursor: pointer;
`;

const TaskText = styled.span`
  flex-grow: 1;
  font-size: 18px;
  font-family: sans-serif
`;

const NoTaskMessage = styled.div`
  font-size: 16px;
  color: #888;
  text-align: center;
  font-family: sans-serif
`;
