import React, { Component } from 'react';

//Components

export default class NavBar extends Component {
	constructor() {
		super();
		this.state = {};

		this.handleCategoryFilter = this.handleCategoryFilter.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
	}

	handleCategoryFilter(e) {
		e.preventDefault();
		let genre = e.target.value;
		this.props.handleCategoryFilter(genre);
	}

	handleSearch(e) {
		e.preventDefault();
		let keyword = this.refs.searchField.value;
		this.props.handleSearch(keyword);
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleSearch} id="filterForm">
					<input
						type="search"
						name="bookName"
						placeholder="Find A Book"
						ref="searchField"
					/>
				</form>

				<select
					name="genreList"
					form="filterForm"
					onChange={this.handleCategoryFilter}
				>
					<option defaultValue value="All">
						Browse Category
					</option>
					<option value="Art">Art</option>
					<option value="Comedy">Comedy</option>
					<option value="History">History</option>
					<option value="Mystery">Mystery</option>
					<option value="Science">Science</option>
				</select>

				<div className="cart">
					<button id="cart">Cart {this.props.booksInCart.bookCount}</button>
				</div>
			</div>
		);
	}
}
