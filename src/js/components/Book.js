import React, { Component } from 'react';

let Book = props => {
	if (!(props.author && props.text)) {
		return null;
	}
	return (
		<div>
			Author: {props.author}
			<br />Text: {props.text}
		</div>
	);
};

module.exports = Book;
