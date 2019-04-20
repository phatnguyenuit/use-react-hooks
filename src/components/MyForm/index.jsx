import "./style.css";

import React, { useContext, useReducer, useState } from "react";

import TextInput from "./TextInput";

const initialState = {
  firstName: "",
  lastName: ""
};
const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "set":
      return { ...state, ...payload };
    case "reset":
      return { ...initialState };
    default:
      return state;
  }
};

const MyForm = ({ firstName, lastName, handleChangeText, handleReset }) => {
  return (
    <div className="my-form">
      <div className="field-group">
        <div className="field-label">First Name:</div>
        <TextInput
          className="field-text"
          name="firstName"
          value={firstName}
          onChangeText={handleChangeText}
        />
      </div>
      <div className="field-group">
        <span className="field-label">Last Name:</span>
        <TextInput
          className="field-text"
          name="lastName"
          value={lastName}
          onChangeText={handleChangeText}
        />
      </div>

      <div>
        <p>{JSON.stringify({ firstName, lastName })}</p>
        <button className="btnReset" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

// useState
const MyFormUseState = () => {
  const [state, setState] = useState(initialState);
  const handleChangeText = e => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleReset = () => {
    setState({ ...initialState });
  };
  return (
    <MyForm
      {...state}
      handleChangeText={handleChangeText}
      handleReset={handleReset}
    />
  );
};

const MyFormReducerHOC = (state, dispatch) => {
  const { firstName, lastName } = state;

  const handleChangeText = e => {
    const { name, value } = e.target;
    dispatch({ type: "set", payload: { [name]: value } });
  };

  const handleReset = () => {
    dispatch({ type: "reset" });
  };
  return <MyForm {...{ firstName, lastName, handleChangeText, handleReset }} />;
};

// useReducer
const MyFormReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return MyFormReducerHOC(state, dispatch);
};

const FormContext = React.createContext();

const FormProvider = ({ children }) => {
  const contextValue = useReducer(reducer, initialState);
  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
};

// useContext
const MyFormWithContext = () => {
  const [state, dispatch] = useContext(FormContext);
  return MyFormReducerHOC(state, dispatch);
};

export { MyFormReducer, MyFormWithContext, FormProvider };
export default MyFormUseState;
