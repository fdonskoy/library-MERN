import React, { Component } from 'react';

export default class Book extends Component {
	constructor() {
		super();
		this.state = {
			name: 'Filip'
		};
	}
	render() {
		return <div className="home">{this.state.name}</div>;
	}
}
