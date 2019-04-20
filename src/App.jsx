import './App.css';

import MyCounter, { CounterProvider, MyCounterContext } from './components/MyCounter';
import React, { Component } from 'react';

import MyForm from './components/MyForm';
import logo from './logo.svg';

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<p>
						<p>Hello, here are some simple demos with React Hooks!</p>
					</p>
					<a
						className="App-link"
						href="https://github.com/phatnguyenuit/use-react-hooks"
						target="_blank"
						rel="noopener noreferrer"
					>
						Checkout source code here!
					</a>
				</header>
				<main className="fullHeight">
					1. <code>useReducer</code>
					<div>
						Counter
						<MyCounter />
					</div>
					<div>
						My Form
						<MyForm />
					</div>
					2. <code>useContext</code>
					<div>
						Counter
						<CounterProvider>
							<MyCounterContext />
							<MyCounterContext />
						</CounterProvider>
					</div>
				</main>
			</div>
		);
	}
}

export default App;
