import React from 'react';
import styled from 'styled-components';
import { FilterButtons } from './FilterButton';
import { useFilter } from '../FilterContext';

export const Header: React.FC = () => {
  const {searchQuery, changeSearchQuery} = useFilter()

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeSearchQuery(event.target.value);
  };
  return (
    <HeaderFilterWrapper>
      <Title>Today</Title>
       <SearchInput
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <FilterButtons/>
    </HeaderFilterWrapper>
  );
};

const Title = styled.h1`
  font-size: 28px;
  font-family: sans-serif;
  margin: 4px 0;
`;

const SearchInput = styled.input`
  padding: 8px 12px;
  font-size: 16px;
  font-family: sans-serif;
  border: 1px solid #ddd;
  border-radius: 36px;
  width: 88%;
  height: 28px
`;

const HeaderFilterWrapper = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
  margin-bottom: 24px;

  @media screen and (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px
  }
`;