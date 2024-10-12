import React from 'react';
import styled from 'styled-components';
import { useFilter } from '../FilterContext';

const FILTER_ARRAY = ['All', 'Completed', 'Incomplete']
export const FilterButtons: React.FC = () => {
  const { changeFilter, filter } = useFilter();

  const filtering = (val: string) => {
    changeFilter(val)
  }
  return (
    <ButtonContainer>
      {FILTER_ARRAY.map((val)=> <FilterButton onClick={()=>filtering(val)} style={{backgroundColor: (val == filter)?'#92b09b57':''}}>{val}</FilterButton>)}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const FilterButton = styled.button`
  background-color: #27be51;
  border: none;
  padding: 6px 8px;
  font-size: 12px;
  font-family:sans-serif;
  margin-right: 10px;
  border-radius: 5px;
  cursor: pointer;

  // &:hover {
  //   background-color: #bbb;
  // }
`;
