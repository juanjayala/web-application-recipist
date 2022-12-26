// from https://dev.to/holdmypotion/using-react-context-api-like-a-pro-13k5
import React, { useState } from "react";

// query is the state
// SearchHandler is a function for changing the state.
export const SearchContext = React.createContext({
  query: "",
  searchHandler: () => {},
});

// Defining a simple HOC component
const SearchContextProvider = (props) => {
  const [query, setQuery] = useState("");

  const searchHandler = (query) => {
    setQuery(query);
  };

  return (
    <SearchContext.Provider
      value={{ query: query, searchHandler: searchHandler }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;