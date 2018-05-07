import React, { Component } from 'react';

//Components
import BookCollection from './BookCollection.js';
import NavBar from './NavBar.js';

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			genre: 'All',
			searchInput: ''
		};

		this.handleCategoryFilter = this.handleCategoryFilter.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
	}

	handleCategoryFilter(genre) {
		console.log('filtered by category', genre);
		this.setState({
			genre
		});
	}

	handleSearch(searchInput) {
		console.log('filtered by search', searchInput);
		this.setState({
			searchInput
		});
	}

	render() {
		return (
			<div>
				<NavBar
					handleCategoryFilter={this.handleCategoryFilter}
					handleSearch={this.handleSearch}
				/>
				<BookCollection
					url="http://localhost:3001/api/books"
					filterGenre={this.state.genre}
					searchInput={this.state.searchInput}
				/>
			</div>
		);
	}
}
