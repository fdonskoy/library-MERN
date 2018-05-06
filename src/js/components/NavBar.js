import React, { Component } from 'react';

//Components

export default class NavBar extends Component {
	constructor() {
		super();
		this.state = {};

		this.handleCategoryFilter = this.handleCategoryFilter.bind(this);
	}

	handleCategoryFilter(e) {
		e.preventDefault();
		let genre = e.target.value;
		this.props.handleCategoryFilter(genre);
	}

	render() {
		return (
			<div>
				<form action="/action_page.php" id="filterForm">
					Firstname:<input type="text" name="bookName" />
					<input type="submit" />
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
			</div>
		);
	}
}
