import './style.css';

import React, { useContext, useReducer } from 'react';

const initialState = {
	value: 1
};

const reducer = (state, action) => {
	const { value } = state;
	const { value: actionValue } = action;
	switch (action.type) {
		case 'set':
			return { ...initialState, value: actionValue };
		case 'decrement':
			return { ...state, value: value - 1 };
		case 'increment':
			return { ...state, value: value + 1 };
		default:
			return state;
	}
};

const MyCounterHOC = (state, dispatch) => {
	const { value } = state;
	return (
		<div className="button-group">
			<button className="button button--left" onClick={() => dispatch({ type: 'decrement' })}>
				-
			</button>
			<div className="value">{value}</div>
			<button className="button button--right" onClick={() => dispatch({ type: 'increment' })}>
				+
			</button>
			<button className="button button--full-width" onClick={() => dispatch({ type: 'set', value: 0 })}>
				reset
			</button>
		</div>
	);
};

const MyCounter = () => {
	const [ state, dispatch ] = useReducer(reducer, initialState);
	return MyCounterHOC(state, dispatch);
};

// with Context
const CounterContext = React.createContext();
const CounterProvider = ({ children }) => {
	const contextValue = useReducer(reducer, initialState);
	return <CounterContext.Provider value={contextValue}>{children}</CounterContext.Provider>;
};

const useCount = () => {
	const contextValue = useContext(CounterContext);
	return contextValue;
};

const MyCounterContext = () => {
	const [ state, dispatch ] = useCount();
	return MyCounterHOC(state, dispatch);
};

export { MyCounterContext, CounterProvider };
export default MyCounter;
