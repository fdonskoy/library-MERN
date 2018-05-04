import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//Components
import BookCollection from './BookCollection.js';

class App extends Component {
	constructor() {
		super();
		this.state = {};
	}
	render() {
		return (
			<BookCollection
				url="http://localhost:3001/api/books"
				pollInterval={2000}
			/>
		);
	}
}

const app = document.getElementById('app');

ReactDOM.render(<App />, app);
