import { createContext, useState } from "react";

export const SearchListContext = createContext();

const SearchListProvider = ({ children }) => {
  const [searchData, setSearchData] = useState("");

  return (
    <SearchListContext.Provider value={{ searchData, setSearchData }}>
      {children}
    </SearchListContext.Provider>
  );
};

export default SearchListProvider;
