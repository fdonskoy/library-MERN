webpackJsonp([0],{

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(10);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _BookCollection = __webpack_require__(34);

var _BookCollection2 = _interopRequireDefault(_BookCollection);

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

		_this.state = {};
		return _this;
	}

	_createClass(App, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(_BookCollection2.default, {
				url: 'http://localhost:3001/api/books',
				pollInterval: 2000
			});
		}
	}]);

	return App;
}(_react.Component);

var app = document.getElementById('app');

_reactDom2.default.render(_react2.default.createElement(App, null), app);

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

var _Book = __webpack_require__(35);

var _Book2 = _interopRequireDefault(_Book);

var _axios = __webpack_require__(36);

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
			data: []
		};

		_this.loadCommentsFromServer = _this.loadCommentsFromServer.bind(_this);
		_this.handleCommentSubmit = _this.handleCommentSubmit.bind(_this);
		return _this;
	}

	_createClass(BookCollection, [{
		key: 'loadCommentsFromServer',
		value: function loadCommentsFromServer() {
			var _this2 = this;

			_axios2.default.get(this.props.url).then(function (res) {
				_this2.setState({ data: res.data });
				console.log(res.data);
			});
		}
	}, {
		key: 'handleCommentSubmit',
		value: function handleCommentSubmit(comment) {
			//add POST request
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.loadCommentsFromServer();
			setInterval(this.loadCommentsFromServer, this.props.pollInterval);
		}
	}, {
		key: 'render',
		value: function render() {
			var books = this.state.data.map(function (book, index) {
				return _react2.default.createElement(_Book2.default, { author: book.author, text: book.text, key: book['_id'] });
			});

			return _react2.default.createElement(
				'div',
				null,
				books
			);
		}
	}]);

	return BookCollection;
}(_react.Component);

exports.default = BookCollection;

/***/ }),

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Book = function Book(props) {
	if (!(props.author && props.text)) {
		return null;
	}
	return _react2.default.createElement(
		'div',
		null,
		'Author: ',
		props.author,
		_react2.default.createElement('br', null),
		'Text: ',
		props.text
	);
};

module.exports = Book;

/***/ })

},[22]);