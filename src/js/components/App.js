import React, { Component } from 'react';

//Components
import BookCollection from './BookCollection.js';
import NavBar from './NavBar.js';

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			genre: 'All'
		};

		this.handleCategoryFilter = this.handleCategoryFilter.bind(this);
	}

	handleCategoryFilter(genre) {
		console.log('filtered by category', genre);
		this.setState({
			genre
		});
	}

	render() {
		return (
			<div>
				<NavBar handleCategoryFilter={this.handleCategoryFilter} />
				<BookCollection
					url="http://localhost:3001/api/books"
					filterGenre={this.state.genre}
				/>
			</div>
		);
	}
}
