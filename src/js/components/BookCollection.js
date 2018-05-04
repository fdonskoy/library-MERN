import React, { Component } from 'react';
import Book from './Book.js';

import axios from 'axios';

export default class BookCollection extends Component {
	constructor() {
		super();
		this.state = {
			data: []
		};

		this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
		this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
	}

	loadCommentsFromServer() {
		axios.get(this.props.url).then(res => {
			this.setState({ data: res.data });
			console.log(res.data);
		});
	}
	handleCommentSubmit(comment) {
		//add POST request
	}

	componentDidMount() {
		this.loadCommentsFromServer();
		setInterval(this.loadCommentsFromServer, this.props.pollInterval);
	}

	render() {
		let books = this.state.data.map((book, index) => {
			return <Book author={book.author} text={book.text} key={book['_id']} />;
		});

		return <div>{books}</div>;
	}
}
