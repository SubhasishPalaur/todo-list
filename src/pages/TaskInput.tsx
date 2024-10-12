import React, { useState } from 'react';
import styled from 'styled-components';

interface TaskInputProps {
  addTask: (text: string) => void;
}

export const TaskInput: React.FC<TaskInputProps> = ({ addTask }) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(''); // State to store validation error

  const handleAddTask = () => {
    if (inputValue.trim()) {
      addTask(inputValue);
      setInputValue('');
      setError(''); // Reset error message on successful task addition
    } else {
      setError('Task cannot be empty!'); // Set error message
    }
  };

  return (
    <InputContainer>
      <InputField
        type="text"
        placeholder="Type something"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        hasError={!!error}
      />
      <AddButton onClick={handleAddTask}>Add Task</AddButton>
    </InputContainer>
  );
};

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  @media screen and (max-width: 480px) {
    gap: 8px;
  }
`;

// Modify the InputField styled component to accept 'hasError' prop
const InputField = styled.input<{ hasError: boolean }>`
  flex-grow: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid ${({ hasError }) => (hasError ? 'red' : '#ddd')}; // Apply red border if error
  border-radius: 5px;
  margin-bottom: 10px;

  &:focus {
    outline: none;
    border-color: ${({ hasError }) => (hasError ? 'red' : '#aaa')}; // Maintain red border on focus if error
  }
`;

const AddButton = styled.button`
  padding: 10px 20px;
  background-color: black;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

