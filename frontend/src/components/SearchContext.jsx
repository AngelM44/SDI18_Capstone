import React, { createContext, useContext, useState, useEffect } from "react";

const SearchContext = createContext();

export const useSearchContext = () => {
  return useContext(SearchContext);
};

export const SearchProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState('');

 const setSearch = (value) => {
  setSearchValue(value)
 }

  return (
    <SearchContext.Provider value={{ searchValue, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};
