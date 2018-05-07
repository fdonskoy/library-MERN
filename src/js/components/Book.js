import React, { Component } from 'react';

//for now this is a presentational component that could be extended to be a user submitted/posted book
export default class Book extends Component {
	constructor(props) {
		super(props);
		this.state = {
			toBeUpdated: false,
			author: '',
			title: '',
			genre: '', //type enumerable
			description: '',
			image: {
				thumbnail: '',
				large: ''
			},
			price: '',
			inCart: false,
			count: this.props.count
		};

		this.handleIncrement = this.handleIncrement.bind(this);
		this.handleDecrement = this.handleDecrement.bind(this);
	}

	handleIncrement() {
		let id = this.props.uniqueID;
		this.props.handleCart('add', id, this.state.count, this.props.book);
		this.setState((prevState, props) => {
			count: prevState.count++;
		});
	}

	handleDecrement() {
		let id = this.props.uniqueID;
		this.props.handleCart('subtract', id, this.state.count);
		//check for negative amount of books
		if (this.state.count > 0) {
			this.setState((prevState, props) => {
				count: prevState.count--;
			});
		}
	}

	render() {
		if (!this.props.title) {
			return null;
		}
		return (
			<div>
				<img src={`images/${this.props.uniqueID}.jpg`} />
				Title: {this.props.title}
				<br />Author: {this.props.author}
				<br />Genre: {this.props.genre}
				<br />Description: {this.props.description}
				<br />Price: {this.props.price}
				<br />
				<button onClick={this.handleIncrement}>+</button>
				{this.state.count}
				{this.state.count > 0 ? (
					<button onClick={this.handleDecrement}>-</button>
				) : null}
				{this.state.toBeUpdated ? (
					<form onSubmit={this.handleBookUpdate}>
						<input
							type="text"
							placeholder="Update name…"
							value={this.state.author}
							onChange={this.handleAuthorChange}
						/>
						<input
							type="text"
							placeholder="Update your book…"
							value={this.state.genre}
							onChange={this.handleTextChange}
						/>
						<input type="submit" value="Update" />
					</form>
				) : null}
			</div>
		);
	}
}

//deprecated methods that could be used to update or delete a user's posted book

// handleTextChange(e) {
// 	this.setState({ text: e.target.value });
// }
// handleAuthorChange(e) {
// 	this.setState({ author: e.target.value });
// }
// updateBook(e) {
// 	e.preventDefault();
// 	//brings up the update field when we click on the update link.
// 	this.setState({ toBeUpdated: !this.state.toBeUpdated });
// }
// handleBookUpdate(e) {
// 	e.preventDefault();
// 	let id = this.props.uniqueID;
// 	//if author or text changed, set it. if not, leave null and our PUT
// 	//request will ignore it.
// 	let author = this.state.author ? this.state.author : null;
// 	// let text = this.state.text ? this.state.text : null;
// 	let book = { author };
// 	this.props.onBookUpdate(id, book);
// 	this.setState({
// 		toBeUpdated: !this.state.toBeUpdated,
// 		author: ''
// 	});
// }

// deleteBook(e) {
// 	e.preventDefault();
// 	let id = this.props.uniqueID;
// 	this.props.onBookDelete(id);
// 	console.log('oops deleted');
// }
