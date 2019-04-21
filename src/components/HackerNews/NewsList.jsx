import "./style.scss";

import React, { useEffect, useState } from "react";

import Axios from "axios";
import News from "./News";
import TextInput from "../MyForm/TextInput";

const API_URL = "https://hn.algolia.com/api/v1";

const initialState = {
  query: "",
  items: [],
  loading: false,
  error: ""
};
const NewsList = props => {
  const [state, setState] = useState(initialState);
  const { query, items, loading, error } = state;
  const handleChangeText = e => {
    const { value } = e.currentTarget;
    setState(prevState => ({ ...prevState, query: value }));
  };
  useEffect(() => {
    setState(prevState => ({ ...prevState, loading: true, erorr: "" }));
    Axios(`${API_URL}/search?query=${query}`)
      .then(res => {
        const { hits = [] } = res.data || {};
        setState(prevState => ({
          ...prevState,
          items: hits,
          loading: false,
          error: ""
        }));
      })
      .catch(e =>
        setState(prevState => ({
          ...prevState,
          error: e.message,
          loading: false,
          items: []
        }))
      );
    // Can return a callback to clean in componentWillUnmount phase
  }, [query]);
  return (
    <div className="hacker-news-container">
      <span className="field-label">Search:</span>
      <TextInput
        className="field-text"
        value={query}
        onChangeText={handleChangeText}
      />
      {loading && <p>Loading....</p>}
      {!loading && !!error && <p>Error: {error}</p>}
      {!loading && items.length > 0 && (
        // TODO: We can paginate with parameter page=x in the URL
        // Follow: https://hn.algolia.com/api for more information
        <ol>
          <span>Results:</span>
          {items
            .filter(item => !!item.url)
            .map(item => (
              <News key={item.objectID} {...item} />
            ))}
        </ol>
      )}
    </div>
  );
};

export default NewsList;
