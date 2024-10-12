import React, { createContext, useState, useContext, ReactNode } from 'react';

interface FilterContextType {
  filter: string;
  searchQuery: string;
  changeFilter: (newFilter: string) => void;
  changeSearchQuery: (newQuery: string) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const useFilter = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};

interface FilterProviderProps {
  children: ReactNode;
}

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const [filter, setFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const changeFilter = (newFilter: string) => {
    setFilter(newFilter);
  };

  const changeSearchQuery = (newQuery: string) => {
    setSearchQuery(newQuery);
  };

  return (
    <FilterContext.Provider value={{ filter, searchQuery, changeFilter, changeSearchQuery }}>
      {children}
    </FilterContext.Provider>
  );
};
