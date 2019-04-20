import './style.css';

import React, { useContext, useReducer } from 'react';

import TextInput from './TextInput';

const initialState = {
	firstName: '',
	lastName: ''
};
const reducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case 'set':
			return { ...state, ...payload };
		case 'reset':
			return { ...initialState };
		default:
			return state;
	}
};

const MyFormHOC = (state, dispatch) => {
	const { firstName, lastName, gender } = state;

	const handleChangeText = (e) => {
		const { name, value } = e.target;
		console.log(name, value);
		dispatch({ type: 'set', payload: { [name]: value } });
	};

	const handleReset = () => {
		dispatch({ type: 'reset' });
	};
	console.log(gender === 'male');
	return (
		<div className="my-form">
			<div className="field-group">
				<div className="field-label">First Name:</div>
				<TextInput className="field-text" name="firstName" value={firstName} onChangeText={handleChangeText} />
			</div>
			<div className="field-group">
				<span className="field-label">Last Name:</span>
				<TextInput className="field-text" name="lastName" value={lastName} onChangeText={handleChangeText} />
			</div>

			<div>
				<p>{JSON.stringify(state)}</p>
				<button className="btnReset" onClick={handleReset}>
					Reset
				</button>
			</div>
		</div>
	);
};

const MyForm = () => {
	const [ state, dispatch ] = useReducer(reducer, initialState);
	return MyFormHOC(state, dispatch);
};

const FormContext = React.createContext();

const FormProvider = ({ children }) => {
	const contextValue = useReducer(reducer, initialState);
	return <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>;
};

const MyFormWithContext = () => {
	const [ state, dispatch ] = useContext(FormContext);
	return MyFormHOC(state, dispatch);
};

export { MyFormWithContext, FormProvider };
export default MyForm;
