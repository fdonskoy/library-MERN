import React, { Component } from 'react';

export default class Book extends Component {
	constructor(props) {
		super(props);
		this.state = {
			toBeUpdated: false,
			author: '',
			text: ''
		};

		//binding all our functions to this class
		this.deleteBook = this.deleteBook.bind(this);
		this.updateBook = this.updateBook.bind(this);
		this.handleAuthorChange = this.handleAuthorChange.bind(this);
		this.handleTextChange = this.handleTextChange.bind(this);
		this.handleBookUpdate = this.handleBookUpdate.bind(this);
	}

	updateBook(e) {
		e.preventDefault();
		//brings up the update field when we click on the update link.
		this.setState({ toBeUpdated: !this.state.toBeUpdated });
	}

	handleBookUpdate(e) {
		e.preventDefault();
		let id = this.props.uniqueID;
		//if author or text changed, set it. if not, leave null and our PUT
		//request will ignore it.
		let author = this.state.author ? this.state.author : null;
		let text = this.state.text ? this.state.text : null;
		let book = { author: author, text: text };
		this.props.onBookUpdate(id, book);
		this.setState({
			toBeUpdated: !this.state.toBeUpdated,
			author: '',
			text: ''
		});
	}

	deleteBook(e) {
		e.preventDefault();
		let id = this.props.uniqueID;
		this.props.onBookDelete(id);
		console.log('oops deleted');
	}
	handleTextChange(e) {
		this.setState({ text: e.target.value });
	}
	handleAuthorChange(e) {
		this.setState({ author: e.target.value });
	}

	render() {
		if (!(this.props.author && this.props.text)) {
			return null;
		}
		return (
			<div>
				Author: {this.props.author}
				<br />Text: {this.props.text}
				<br />
				<a href="#" onClick={this.updateBook}>
					update
				</a>
				<a href="#" onClick={this.deleteBook}>
					delete
				</a>
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
							value={this.state.text}
							onChange={this.handleTextChange}
						/>
						<input type="submit" value="Update" />
					</form>
				) : null}
			</div>
		);
	}
}
