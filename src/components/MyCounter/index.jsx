import "./style.scss";

import React, { useContext, useReducer, useState } from "react";

const initialState = {
  value: 0
};

const reducer = (state, action) => {
  const { value } = state;
  const { value: actionValue } = action;
  switch (action.type) {
    case "set":
      return { ...initialState, value: actionValue };
    case "decrement":
      return { ...state, value: value - 1 };
    case "increment":
      return { ...state, value: value + 1 };
    default:
      return state;
  }
};

const MyCounter = ({ value, increase, decrease, reset }) => {
  return (
    <div className="button-group">
      <button className="button button--left" onClick={decrease}>
        -
      </button>
      <div className="value">{value}</div>
      <button className="button button--right" onClick={increase}>
        +
      </button>
      <button className="button button--full-width" onClick={reset}>
        reset
      </button>
    </div>
  );
};

// useState
const MyCounterUseState = () => {
  const [state, setState] = useState(initialState);
  const decrease = () =>
    setState(prevState => ({ ...prevState, value: prevState.value - 1 }));
  const increase = () =>
    setState(prevState => ({ ...prevState, value: prevState.value + 1 }));
  const reset = () => setState({ value: 0 });
  return (
    <MyCounter
      {...state}
      increase={increase}
      decrease={decrease}
      reset={reset}
    />
  );
};

const MyCounterReducerHOC = (state, dispatch) => {
  const decrease = () => dispatch({ type: "decrement" });
  const increase = () => dispatch({ type: "increment" });
  const reset = () => dispatch({ type: "set", value: 0 });
  return (
    <MyCounter
      {...state}
      increase={increase}
      decrease={decrease}
      reset={reset}
    />
  );
};

// useReducer
const MyCounterReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return MyCounterReducerHOC(state, dispatch);
};

// useContext
const CounterContext = React.createContext();
const CounterProvider = ({ children }) => {
  const contextValue = useReducer(reducer, initialState);
  return (
    <CounterContext.Provider value={contextValue}>
      {children}
    </CounterContext.Provider>
  );
};

const MyCounterWithContext = () => {
  const [state, dispatch] = useContext(CounterContext);
  return MyCounterReducerHOC(state, dispatch);
};

export { MyCounterReducer, MyCounterWithContext, CounterProvider };
export default MyCounterUseState;
