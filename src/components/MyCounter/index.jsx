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

const MyCounterReducerHOC = (state, dispatch) => {
	const { value } = state;
	const decrease = () => dispatch({ type: 'decrement' });
	const increase = () => dispatch({ type: 'increment' });
	const reset = () => dispatch({ type: 'set', value: 0 });
	return <MyCounter {...{ value, increase, decrease, reset }} />;
};

const MyCounterReducer = () => {
	const [ state, dispatch ] = useReducer(reducer, initialState);
	return MyCounterReducerHOC(state, dispatch);
};

// with Context
const CounterContext = React.createContext();
const CounterProvider = ({ children }) => {
	const contextValue = useReducer(reducer, initialState);
	return <CounterContext.Provider value={contextValue}>{children}</CounterContext.Provider>;
};

const MyCounterWithContext = () => {
	const [ state, dispatch ] = useContext(CounterContext);
	return MyCounterReducerHOC(state, dispatch);
};

export { MyCounterWithContext, CounterProvider };
export default MyCounterReducer;
