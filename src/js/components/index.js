import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//Components
import Book from './Book.js';

class App extends Component {
	constructor() {
		super();
		this.state = {};
	}
	render() {
		return <Book />;
	}
}

const app = document.getElementById('app');

ReactDOM.render(<App />, app);
