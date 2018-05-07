webpackJsonp([0],{

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(10);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _App = __webpack_require__(34);

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = document.getElementById('app');

//Components


_reactDom2.default.render(_react2.default.createElement(_App2.default, null), app);

/***/ }),

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _BookCollection = __webpack_require__(35);

var _BookCollection2 = _interopRequireDefault(_BookCollection);

var _NavBar = __webpack_require__(57);

var _NavBar2 = _interopRequireDefault(_NavBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//Components


var App = function (_Component) {
	_inherits(App, _Component);

	function App() {
		_classCallCheck(this, App);

		var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

		_this.state = {
			genre: 'All',
			searchInput: '',
			booksInCart: {
				bookCount: 0,
				totalPrice: 0,
				books: []
			}
		};

		_this.handleCategoryFilter = _this.handleCategoryFilter.bind(_this);
		_this.handleSearch = _this.handleSearch.bind(_this);
		_this.handleCart = _this.handleCart.bind(_this);
		return _this;
	}

	_createClass(App, [{
		key: 'handleCategoryFilter',
		value: function handleCategoryFilter(genre) {
			console.log('filtered by category', genre);
			this.setState({
				genre: genre
			});
		}
	}, {
		key: 'handleSearch',
		value: function handleSearch(searchInput) {
			console.log('filtered by search', searchInput);
			this.setState({
				searchInput: searchInput
			});
		}

		//operation for the cart interaction (add or remove book)
		//search for the book id in the user's cart

	}, {
		key: 'handleCart',
		value: function handleCart(op, id, count, bookProps) {
			var booksInCart = this.state.booksInCart;
			var books = booksInCart.books;
			//new book object for cart containing the book iteslf and the amount of that book in the cart
			var bookInCart = {
				book: null,
				count: 0
			};

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = books[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var b = _step.value;

					if (b.book['_id'] == id) {
						bookInCart = b;
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
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
				booksInCart.totalPrice += parseFloat(bookInCart.book.price.replace(',', '.'));
				booksInCart.bookCount++;
			} else if (op === 'subtract') {
				bookInCart.count--;

				//remove the book if the count is 0
				if (bookInCart.count === 0) {
					books.splice(books.indexOf(bookInCart), 1);
				}

				//book price comes as string
				booksInCart.totalPrice -= parseFloat(bookInCart.book.price.replace(',', '.'));

				//account for small offsets while subtracting floats, can probably be fixed by continuously fixing
				//the additions and subtractiong to two decimal places
				if (booksInCart.totalPrice > -0.01 && booksInCart.totalPrice < 0) {
					booksInCart.totalPrice = 0;
				}

				booksInCart.bookCount--;
			}

			this.setState(function (prevState, props) {
				console.log(booksInCart);
				return { booksInCart: booksInCart };
			});
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(_NavBar2.default, {
					handleCategoryFilter: this.handleCategoryFilter,
					handleSearch: this.handleSearch,
					booksInCart: this.state.booksInCart
				}),
				_react2.default.createElement(_BookCollection2.default, {
					url: 'http://localhost:3001/api/books',
					filterGenre: this.state.genre,
					searchInput: this.state.searchInput,
					booksInCart: this.state.booksInCart,
					handleCart: this.handleCart
				})
			);
		}
	}]);

	return App;
}(_react.Component);

exports.default = App;

/***/ }),

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _Book = __webpack_require__(36);

var _Book2 = _interopRequireDefault(_Book);

var _BookForm = __webpack_require__(37);

var _BookForm2 = _interopRequireDefault(_BookForm);

var _axios = __webpack_require__(38);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BookCollection = function (_Component) {
	_inherits(BookCollection, _Component);

	function BookCollection() {
		_classCallCheck(this, BookCollection);

		var _this = _possibleConstructorReturn(this, (BookCollection.__proto__ || Object.getPrototypeOf(BookCollection)).call(this));

		_this.state = {
			data: [],
			books: []
		};

		_this.loadBooksFromServer = _this.loadBooksFromServer.bind(_this);
		_this.handleBookSubmit = _this.handleBookSubmit.bind(_this);
		_this.handleBookDelete = _this.handleBookDelete.bind(_this);
		_this.handleBookUpdate = _this.handleBookUpdate.bind(_this);
		return _this;
	}

	_createClass(BookCollection, [{
		key: 'loadBooksFromServer',
		value: function loadBooksFromServer() {
			var _this2 = this;

			_axios2.default.get(this.props.url).then(function (res) {
				_this2.setState({ data: res.data, books: res.data });
				console.log(res.data);
			});
		}
	}, {
		key: 'handleBookSubmit',
		value: function handleBookSubmit(book) {
			var _this3 = this;

			//add POST request
			var books = this.state.data;
			book.id = Date.now();
			var newBooks = books.concat([book]);
			this.setState({ data: newBooks });
			_axios2.default.post(this.props.url, book).catch(function (err) {
				console.error(err);
				_this3.setState({ data: books });
			});
		}
	}, {
		key: 'handleBookDelete',
		value: function handleBookDelete(id) {
			var _this4 = this;

			_axios2.default.delete(this.props.url + '/' + id).then(function (res) {
				console.log('Book deleted');
				_this4.loadBooksFromServer();
			}).catch(function (err) {
				console.error(err);
			});
		}
	}, {
		key: 'handleBookUpdate',
		value: function handleBookUpdate(id, book) {
			var _this5 = this;

			//sends the book id and new author/text to our api
			console.log(id, book);
			_axios2.default.put(this.props.url + '/' + id, book).then(function () {
				_this5.loadBooksFromServer();
			}).catch(function (err) {
				console.log(err);
			});
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var filterGenre = nextProps.filterGenre;
			var searchInput = nextProps.searchInput;

			var books = this.state.data;

			//check if the books exist
			if (books === undefined || books.length == 0) {
				return;
			}

			//if the filter changed, get the books associated with the filter
			if (this.props.filterGenre != nextProps.filterGenre) {
				//return all the books in the current state if the genre filter is set to All
				if (!(filterGenre === 'All')) {
					books = books.filter(function (book) {
						return book.genre === filterGenre;
					});
					this.setState({
						books: books
					});
				} else {
					books = this.state.data;
					this.setState({
						books: books
					});
				}
			}

			//search available books by search input
			if (this.props.searchInput != nextProps.searchInput) {
				//return all the books in the current state if the input is blank
				if (!(searchInput === undefined || searchInput === '')) {
					books = books.filter(function (book) {
						var title = book.title;
						title = title.toLowerCase();
						var input = searchInput.toLowerCase();
						return title.includes(input);
					});
					this.setState({
						books: books
					});
				} else {
					books = this.state.data;
					this.setState({
						books: books
					});
				}
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.loadBooksFromServer();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this6 = this;

			var books = this.state.books.map(function (book, index) {
				var id = book._id;
				var count = 0;

				for (var item in _this6.props.booksInCart) {
					if (item['_id'] == id) {
						count = item.count;
					}
				}

				return _react2.default.createElement(_Book2.default, {
					author: book.author,
					title: book.title,
					genre: book.genre,
					description: book.description,
					price: book.price,
					image: book.image,
					count: count,
					book: book,
					key: book['_id'],
					uniqueID: book['_id'],
					onBookDelete: _this6.handleBookDelete,
					onBookUpdate: _this6.handleBookUpdate,
					handleCart: _this6.props.handleCart
				});
			});

			return _react2.default.createElement(
				'div',
				null,
				books,
				_react2.default.createElement(_BookForm2.default, { onBookSubmit: this.handleBookSubmit })
			);
		}
	}]);

	return BookCollection;
}(_react.Component);

exports.default = BookCollection;

/***/ }),

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//for now this is a presentational component that could be extended to be a user submitted/posted book
var Book = function (_Component) {
	_inherits(Book, _Component);

	function Book(props) {
		_classCallCheck(this, Book);

		var _this = _possibleConstructorReturn(this, (Book.__proto__ || Object.getPrototypeOf(Book)).call(this, props));

		_this.state = {
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
			count: _this.props.count
		};

		_this.handleIncrement = _this.handleIncrement.bind(_this);
		_this.handleDecrement = _this.handleDecrement.bind(_this);
		return _this;
	}

	_createClass(Book, [{
		key: 'handleIncrement',
		value: function handleIncrement() {
			var id = this.props.uniqueID;
			this.props.handleCart('add', id, this.state.count, this.props.book);
			this.setState(function (prevState, props) {
				count: prevState.count++;
			});
		}
	}, {
		key: 'handleDecrement',
		value: function handleDecrement() {
			var id = this.props.uniqueID;
			this.props.handleCart('subtract', id, this.state.count);
			//check for negative amount of books
			if (this.state.count > 0) {
				this.setState(function (prevState, props) {
					count: prevState.count--;
				});
			}
		}
	}, {
		key: 'render',
		value: function render() {
			if (!this.props.title) {
				return null;
			}
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement('img', { src: 'images/' + this.props.uniqueID + '.jpg' }),
				'Title: ',
				this.props.title,
				_react2.default.createElement('br', null),
				'Author: ',
				this.props.author,
				_react2.default.createElement('br', null),
				'Genre: ',
				this.props.genre,
				_react2.default.createElement('br', null),
				'Description: ',
				this.props.description,
				_react2.default.createElement('br', null),
				'Price: ',
				this.props.price,
				_react2.default.createElement('br', null),
				_react2.default.createElement(
					'button',
					{ onClick: this.handleIncrement },
					'+'
				),
				this.state.count,
				this.state.count > 0 ? _react2.default.createElement(
					'button',
					{ onClick: this.handleDecrement },
					'-'
				) : null,
				this.state.toBeUpdated ? _react2.default.createElement(
					'form',
					{ onSubmit: this.handleBookUpdate },
					_react2.default.createElement('input', {
						type: 'text',
						placeholder: 'Update name\u2026',
						value: this.state.author,
						onChange: this.handleAuthorChange
					}),
					_react2.default.createElement('input', {
						type: 'text',
						placeholder: 'Update your book\u2026',
						value: this.state.genre,
						onChange: this.handleTextChange
					}),
					_react2.default.createElement('input', { type: 'submit', value: 'Update' })
				) : null
			);
		}
	}]);

	return Book;
}(_react.Component);

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


exports.default = Book;

/***/ }),

/***/ 37:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BookForm = function (_Component) {
	_inherits(BookForm, _Component);

	function BookForm(props) {
		_classCallCheck(this, BookForm);

		var _this = _possibleConstructorReturn(this, (BookForm.__proto__ || Object.getPrototypeOf(BookForm)).call(this, props));

		_this.state = { author: '', text: '' };
		_this.handleAuthorChange = _this.handleAuthorChange.bind(_this);
		_this.handleTextChange = _this.handleTextChange.bind(_this);
		_this.handleSubmit = _this.handleSubmit.bind(_this);
		return _this;
	}

	_createClass(BookForm, [{
		key: 'handleAuthorChange',
		value: function handleAuthorChange(e) {
			this.setState({ author: e.target.value });
		}
	}, {
		key: 'handleTextChange',
		value: function handleTextChange(e) {
			this.setState({ text: e.target.value });
		}
	}, {
		key: 'handleSubmit',
		value: function handleSubmit(e) {
			e.preventDefault();
			var author = this.state.author.trim();
			var text = this.state.text.trim();
			if (!text || !author) {
				return;
			}
			this.props.onBookSubmit({ author: author, text: text });
			this.setState({ author: '', text: '' });
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'form',
				{ onSubmit: this.handleSubmit },
				_react2.default.createElement('input', {
					type: 'text',
					placeholder: 'Your name\u2026',
					value: this.state.author,
					onChange: this.handleAuthorChange
				}),
				_react2.default.createElement('input', {
					type: 'text',
					placeholder: 'Say something\u2026',
					value: this.state.text,
					onChange: this.handleTextChange
				}),
				_react2.default.createElement('input', { type: 'submit', value: 'Post' })
			);
		}
	}]);

	return BookForm;
}(_react.Component);

exports.default = BookForm;

/***/ }),

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//Components

var NavBar = function (_Component) {
	_inherits(NavBar, _Component);

	function NavBar() {
		_classCallCheck(this, NavBar);

		var _this = _possibleConstructorReturn(this, (NavBar.__proto__ || Object.getPrototypeOf(NavBar)).call(this));

		_this.state = {};

		_this.handleCategoryFilter = _this.handleCategoryFilter.bind(_this);
		_this.handleSearch = _this.handleSearch.bind(_this);
		return _this;
	}

	_createClass(NavBar, [{
		key: "handleCategoryFilter",
		value: function handleCategoryFilter(e) {
			e.preventDefault();
			var genre = e.target.value;
			this.props.handleCategoryFilter(genre);
		}
	}, {
		key: "handleSearch",
		value: function handleSearch(e) {
			e.preventDefault();
			var keyword = this.refs.searchField.value;
			this.props.handleSearch(keyword);
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					"form",
					{ onSubmit: this.handleSearch, id: "filterForm" },
					_react2.default.createElement("input", {
						type: "search",
						name: "bookName",
						placeholder: "Find A Book",
						ref: "searchField"
					})
				),
				_react2.default.createElement(
					"select",
					{
						name: "genreList",
						form: "filterForm",
						onChange: this.handleCategoryFilter
					},
					_react2.default.createElement(
						"option",
						{ defaultValue: true, value: "All" },
						"Browse Category"
					),
					_react2.default.createElement(
						"option",
						{ value: "Art" },
						"Art"
					),
					_react2.default.createElement(
						"option",
						{ value: "Comedy" },
						"Comedy"
					),
					_react2.default.createElement(
						"option",
						{ value: "History" },
						"History"
					),
					_react2.default.createElement(
						"option",
						{ value: "Mystery" },
						"Mystery"
					),
					_react2.default.createElement(
						"option",
						{ value: "Science" },
						"Science"
					)
				),
				_react2.default.createElement(
					"div",
					{ className: "cart" },
					_react2.default.createElement(
						"button",
						{ id: "cart" },
						"Cart ",
						this.props.booksInCart.bookCount
					)
				)
			);
		}
	}]);

	return NavBar;
}(_react.Component);

exports.default = NavBar;

/***/ })

},[22]);