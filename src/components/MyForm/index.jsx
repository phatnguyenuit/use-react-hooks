import './style.css';

import React, { useReducer } from 'react';

import RadioInput from './RadioInput';
import TextInput from './TextInput';

const initialState = {
	firstName: '',
	lastName: '',
	gender: 'male'
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

const MyForm = () => {
	const [ state, dispatch ] = useReducer(reducer, initialState);
	const { firstName, lastName, gender } = state;

	const handleChangeText = (e) => {
		const { name, value } = e.target;
		dispatch({ type: 'set', payload: { [name]: value } });
	};

	const handleReset = () => {
		dispatch({ type: 'reset' });
	};
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
			<div className="field-group">
				<div className="field-label">Gender:</div>
				<div className="field-radio-group">
					<RadioInput
						className="field-radio"
						name="gender"
						value="male"
						onChange={handleChangeText}
						checked={gender === 'male'}
					/>{' '}
					Male
					<RadioInput
						className="field-radio"
						name="gender"
						value="female"
						onChange={handleChangeText}
						checked={gender === 'female'}
					/>{' '}
					Female
					<RadioInput
						className="field-radio"
						name="gender"
						value="other"
						onChange={handleChangeText}
						checked={gender === 'other'}
					/>{' '}
					Other
				</div>
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

export default MyForm;
