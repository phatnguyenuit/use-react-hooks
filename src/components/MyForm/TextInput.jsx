import React from 'react';

const TextInput = ({ value, onChangeText, ...rest }) => (
	<input type="text" value={value} onChange={onChangeText} {...rest} />
);

export default TextInput;
