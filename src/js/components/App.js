import React, { Component } from 'react';

//Components
import BookCollection from './BookCollection.js';
import NavBar from './NavBar.js';

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			genre: 'All',
			searchInput: '',
			booksInCart: {
				bookCount: 0,
				totalPrice: 0,
				books: []
			}
		};

		this.handleCategoryFilter = this.handleCategoryFilter.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleCart = this.handleCart.bind(this);
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

	//operation for the cart interaction (add or remove book)
	//search for the book id in the user's cart
	handleCart(op, id, count, bookProps) {
		let booksInCart = this.state.booksInCart;
		let books = booksInCart.books;
		//new book object for cart containing the book iteslf and the amount of that book in the cart
		let bookInCart = {
			book: null,
			count: 0
		};

		for (let b of books) {
			if (b.book['_id'] == id) {
				bookInCart = b;
			}
		}

		if (op === 'add') {
			//adding a new book to the cart
			if (bookInCart.book === undefined || bookInCart.book === null) {
				bookInCart = {
					book: bookProps,
					count: 1
				};

				//add the book to the cart
				booksInCart.books.push(bookInCart);
			} else {
				bookInCart.count++;
			}
			//book price comes as string
			booksInCart.totalPrice += parseFloat(
				bookInCart.book.price.replace(',', '.')
			);
			booksInCart.bookCount++;
		} else if (op === 'subtract') {
			bookInCart.count--;

			//remove the book if the count is 0
			if (bookInCart.count === 0) {
				books.splice(books.indexOf(bookInCart), 1);
			}

			//book price comes as string
			booksInCart.totalPrice -= parseFloat(
				bookInCart.book.price.replace(',', '.')
			);

			//account for small offsets while subtracting floats, can probably be fixed by continuously fixing
			//the additions and subtractiong to two decimal places
			if (booksInCart.totalPrice > -0.01 && booksInCart.totalPrice < 0) {
				booksInCart.totalPrice = 0;
			}

			booksInCart.bookCount--;
		}

		this.setState((prevState, props) => {
			console.log(booksInCart);
			return { booksInCart };
		});
	}

	render() {
		return (
			<div>
				<NavBar
					handleCategoryFilter={this.handleCategoryFilter}
					handleSearch={this.handleSearch}
					booksInCart={this.state.booksInCart}
				/>
				<BookCollection
					url="http://localhost:3001/api/books"
					filterGenre={this.state.genre}
					searchInput={this.state.searchInput}
					booksInCart={this.state.booksInCart}
					handleCart={this.handleCart}
				/>
			</div>
		);
	}
}
