import React from 'react';

const RadioInput = ({ value, checked, onChange, ...rest }) => (
	<input type="radio" value={value} checked={checked} onChange={onChange} {...rest} />
);

export default RadioInput;
