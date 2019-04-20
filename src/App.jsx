import "./App.css";

import MyCounterUseState, {
  CounterProvider,
  MyCounterReducer,
  MyCounterWithContext
} from "./components/MyCounter";
import MyFormUseState, {
  FormProvider,
  MyFormReducer,
  MyFormWithContext
} from "./components/MyForm";
import React, { Component } from "react";

import logo from "./logo.svg";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Hello, here are some simple demos with React Hooks!</p>
          <a
            className="App-link"
            href="https://github.com/phatnguyenuit/use-react-hooks"
            target="_blank"
            rel="noopener noreferrer"
          >
            Checkout source code here!
          </a>
        </header>
        <main className="App-content">
          <h3>
            1. <code>useState</code>
          </h3>
          <div>
            <h4>Counter</h4>
            <MyCounterUseState />
          </div>
          <div>
            <h4>My Form</h4>
            <MyFormUseState />
          </div>
          <h3>
            2. <code>useReducer</code>
          </h3>
          <div>
            <h4>Counter</h4>
            <MyCounterReducer />
          </div>
          <div>
            <h4>My Form</h4>
            <MyFormReducer />
          </div>
          <h3>
            3. <code>useContext</code>
          </h3>
          <div>
            <h4>Counter</h4>
            <CounterProvider>
              <MyCounterWithContext />
            </CounterProvider>
          </div>
          <div>
            <h4>My Form</h4>
            <FormProvider>
              <MyFormWithContext />
            </FormProvider>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
