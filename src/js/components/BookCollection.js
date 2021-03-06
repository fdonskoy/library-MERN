import React, { Component } from 'react';
import Book from './Book.js';
import BookForm from './BookForm.js';

import axios from 'axios';

export default class BookCollection extends Component {
	constructor() {
		super();
		this.state = {
			data: [],
			books: []
		};

		this.loadBooksFromServer = this.loadBooksFromServer.bind(this);
		this.handleBookSubmit = this.handleBookSubmit.bind(this);
		this.handleBookDelete = this.handleBookDelete.bind(this);
		this.handleBookUpdate = this.handleBookUpdate.bind(this);
	}

	loadBooksFromServer() {
		axios.get(this.props.url).then(res => {
			this.setState({ data: res.data, books: res.data });
			console.log(res.data);
		});
	}

	handleBookSubmit(book) {
		//add POST request
		let books = this.state.data;
		book.id = Date.now();
		let newBooks = books.concat([book]);
		this.setState({ data: newBooks });
		axios.post(this.props.url, book).catch(err => {
			console.error(err);
			this.setState({ data: books });
		});
	}
	handleBookDelete(id) {
		axios
			.delete(`${this.props.url}/${id}`)
			.then(res => {
				console.log('Book deleted');
				this.loadBooksFromServer();
			})
			.catch(err => {
				console.error(err);
			});
	}

	handleBookUpdate(id, book) {
		//sends the book id and new author/text to our api
		console.log(id, book);
		axios
			.put(`${this.props.url}/${id}`, book)
			.then(() => {
				this.loadBooksFromServer();
			})
			.catch(err => {
				console.log(err);
			});
	}

	componentWillReceiveProps(nextProps) {
		const { filterGenre } = nextProps;
		const { searchInput } = nextProps;
		let books = this.state.data;

		//check if the books exist
		if (books === undefined || books.length == 0) {
			return;
		}

		//if the filter changed, get the books associated with the filter
		if (this.props.filterGenre != nextProps.filterGenre) {
			//return all the books in the current state if the genre filter is set to All
			if (!(filterGenre === 'All')) {
				books = books.filter(book => {
					return book.genre === filterGenre;
				});
				this.setState({
					books
				});
			} else {
				books = this.state.data;
				this.setState({
					books
				});
			}
		}

		//search available books by search input
		if (this.props.searchInput != nextProps.searchInput) {
			//return all the books in the current state if the input is blank
			if (!(searchInput === undefined || searchInput === '')) {
				books = books.filter(book => {
					let title = book.title;
					title = title.toLowerCase();
					let input = searchInput.toLowerCase();
					return title.includes(input);
				});
				this.setState({
					books
				});
			} else {
				books = this.state.data;
				this.setState({
					books
				});
			}
		}
	}

	componentDidMount() {
		this.loadBooksFromServer();
	}

	render() {
		let books = this.state.books.map((book, index) => {
			let id = book._id;
			let count = 0;

			for (let item in this.props.booksInCart) {
				if (item['_id'] == id) {
					count = item.count;
				}
			}

			return (
				<Book
					author={book.author}
					title={book.title}
					genre={book.genre}
					description={book.description}
					price={book.price}
					image={book.image}
					count={count}
					book={book}
					key={book['_id']}
					uniqueID={book['_id']}
					onBookDelete={this.handleBookDelete}
					onBookUpdate={this.handleBookUpdate}
					handleCart={this.props.handleCart}
				/>
			);
		});

		return (
			<div>
				{books}
				<BookForm onBookSubmit={this.handleBookSubmit} />
			</div>
		);
	}
}
