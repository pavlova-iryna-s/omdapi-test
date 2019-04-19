(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moviesList = _interopRequireDefault(require("./view/moviesList"));

var _movie = _interopRequireDefault(require("./view/movie"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Controller =
/*#__PURE__*/
function () {
  function Controller() {
    _classCallCheck(this, Controller);
  }

  _createClass(Controller, [{
    key: "init",

    /**
     * @param {String} hash
     */
    value: function init(hash) {
      this.currentView.init(hash);
    }
  }, {
    key: "renderMovie",
    value: function renderMovie() {
      if (!(this.currentView instanceof _movie["default"])) {
        this.currentView = new _movie["default"]();
      }
    }
  }, {
    key: "renderMoviesList",
    value: function renderMoviesList() {
      if (!(this.currentView instanceof _moviesList["default"])) {
        this.currentView = new _moviesList["default"]();
      }
    }
    /**
     * @param {String} hash
     */

  }, {
    key: "setView",
    value: function setView(hash) {
      hash = hash.substring(1);

      if (/^.*\/index.html$/.test(window.location.pathname)) {
        this.renderMoviesList();
      } else {
        this.renderMovie();
      }

      this.init(hash);
    }
  }]);

  return Controller;
}();

exports["default"] = Controller;

},{"./view/movie":5,"./view/moviesList":6}],2:[function(require,module,exports){
"use strict";

var _utils = require("./utils");

var _controller = _interopRequireDefault(require("./controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function App() {
  _classCallCheck(this, App);

  this.controller = new _controller["default"]();
};

var app = new App();

var setView = function setView() {
  app.controller.setView(document.location.hash);
};

(0, _utils.$on)(window, 'load', setView);
(0, _utils.$on)(window, 'hashchange', setView);

},{"./controller":1,"./utils":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$assert = exports.$html = exports.$on = void 0;

/**
 * @param {HTMLElement} target
 * @param {String} event
 * @param {Function} handler
 */
var $on = function $on(target, event, handler) {
  return target.addEventListener(event, handler);
};
/**
 * @param literal
 * @param cooked
 * @return {String}
 */


exports.$on = $on;

var $html = function $html(literal) {
  var result = '';

  for (var _len = arguments.length, cooked = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    cooked[_key - 1] = arguments[_key];
  }

  cooked.forEach(function (cook, i) {
    var lit = literal[i];

    if (Array.isArray(cook)) {
      cook = cook.join('');
    }

    result += lit;
    result += cook;
  });
  result += literal[literal.length - 1];
  return result;
};
/**
 * @param {*} condition
 * @param {String} message
 */


exports.$html = $html;

var $assert = function $assert(condition, message) {
  if (condition) {
    return;
  }

  message = message || 'Assertion failed';

  if (typeof Error !== 'undefined') {
    throw new Error(message);
  }

  throw message;
};

exports.$assert = $assert;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = require("../utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//</debug>
var BaseView =
/*#__PURE__*/
function () {
  function BaseView() {
    _classCallCheck(this, BaseView);

    this.el = document.getElementById('target'); //<debug>

    (0, _utils.$assert)(this.el, 'HTML element with the ID "target" was not found.'); //</debug>
  }
  /**
   * @param {String} hash
   */


  _createClass(BaseView, [{
    key: "init",
    value: function init(hash) {
      this.constructor.setLoadingMask();
    }
    /**
     * @param {Object} data
     */

  }, {
    key: "render",
    value: function render(data) {
      if (data['Response'] === 'True') {
        this.el.innerHTML = this.constructor.getTemplate(data);
      } else {
        //<debug>
        console.log(data); //</debug>

        this.el.innerHTML = "<h5>Sorry. ".concat(data['Error'] || '', "</h5>");
      }

      this.constructor.removeLoadingMask();
    }
    /**
     * @return {String}
     */

  }], [{
    key: "getApiKey",
    value: function getApiKey() {
      return '338f9a63';
    }
    /**
     * @param {String} id
     * @return {Element}
     */

  }, {
    key: "getElementById",
    value: function getElementById(id) {
      var element = document.getElementById(id); //<debug>

      (0, _utils.$assert)(element, "HTML element with the ID \"".concat(id, "\" was not found.")); //</debug>

      return element;
    }
    /**
     * @param {String} poster
     * @return {String}
     */

  }, {
    key: "getPoster",
    value: function getPoster(poster) {
      return poster === 'N/A' ? '' : poster;
    }
    /**
     * @param {Object} data
     * @return {String}
     */

  }, {
    key: "getTemplate",
    value: function getTemplate(data) {
      return '';
    }
  }, {
    key: "setLoadingMask",
    value: function setLoadingMask() {
      document.body.insertAdjacentHTML('beforeend', '<div id="loadingMask"><div class="loading-indicator"></div></div>');
    }
  }, {
    key: "removeLoadingMask",
    value: function removeLoadingMask() {
      var element = document.getElementById('loadingMask');

      if (element) {
        element.parentNode.removeChild(element);
      }
    }
  }]);

  return BaseView;
}();

exports["default"] = BaseView;

},{"../utils":3}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = require("../utils");

var _base = _interopRequireDefault(require("./base"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject() {
  var data = _taggedTemplateLiteral(["", ""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var MovieView =
/*#__PURE__*/
function (_BaseView) {
  _inherits(MovieView, _BaseView);

  /**
   * @inheritDoc
   */
  function MovieView() {
    _classCallCheck(this, MovieView);

    return _possibleConstructorReturn(this, _getPrototypeOf(MovieView).apply(this, arguments));
  }
  /**
   * @inheritDoc
   */


  _createClass(MovieView, [{
    key: "init",
    value: function init(hash) {
      _get(_getPrototypeOf(MovieView.prototype), "init", this).apply(this, arguments);

      this.showMovie(hash);
    }
    /**
     * @inheritDoc
     */

  }, {
    key: "showMovie",

    /**
     * @param {String} movieId
     */
    value: function showMovie(movieId) {
      var _this = this;

      fetch("https://www.omdbapi.com/?apikey=".concat(this.constructor.getApiKey(), "&i=").concat(movieId)).then(function (response) {
        return response.json();
      }).then(function (data) {
        return _this.render(data);
      })["catch"](function (error) {
        return console.error(error);
      });
    }
  }], [{
    key: "getTemplate",
    value: function getTemplate(movie) {
      if (!movie) {
        return '<h4>Sorry, movie was not found.</h4>';
      }

      var descriptionKeys = {
        'Language': 'Language',
        'Actors': 'Actors',
        'Country': 'Country',
        'Director': 'Director',
        'Genre': 'Genre',
        'Writer': 'Writer',
        'imdbRating': 'IMDB Rating'
      };
      var descriptionList = '';

      for (var key in descriptionKeys) {
        descriptionList += "\n                <dt class=\"col-sm-3 text-truncate\">".concat(descriptionKeys[key], "</dt>\n                <dd class=\"col-sm-9\">").concat(movie[key], "</dd>\n            ");
      }

      var poster = this.getPoster(movie['Poster']);
      var output = "\n            <div class=\"col-3\">\n                <img class=\"w-100 movie-poster\" src=\"".concat(poster, "\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"").concat(movie['Title'], "\">\n            </div>\n            <div class=\"col-9 card\">\n                <div class=\"card-body\">\n                    <h3 class=\"card-title\">").concat(movie['Title'], " (").concat(movie['Year'], ")</h3>\n                    <h5 class=\"card-text\">").concat(movie['Plot'], "</h5>\n                    <dl class=\"row pt-3\">\n                        ").concat(descriptionList, "\n                    </dl>\n                </div>\n            </div>\n        ");
      return (0, _utils.$html)(_templateObject(), output);
    }
  }]);

  return MovieView;
}(_base["default"]);

exports["default"] = MovieView;

},{"../utils":3,"./base":4}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = require("../utils");

var _base = _interopRequireDefault(require("./base"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["", ""]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["", ""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var MoviesListView =
/*#__PURE__*/
function (_BaseView) {
  _inherits(MoviesListView, _BaseView);

  /**
   * @inheritDoc
   */
  function MoviesListView() {
    var _this;

    _classCallCheck(this, MoviesListView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MoviesListView).apply(this, arguments));

    _this.addListeners();

    return _this;
  }
  /**
   * @inheritDoc
   */


  _createClass(MoviesListView, [{
    key: "init",
    value: function init(hash) {
      var _hash$split = hash.split('/'),
          _hash$split2 = _slicedToArray(_hash$split, 2),
          searchText = _hash$split2[0],
          pageNumber = _hash$split2[1];

      this.constructor.getElementById('searchText').value = searchText;
      this.constructor.getElementById('pageNumber').value = pageNumber;

      if (searchText) {
        _get(_getPrototypeOf(MoviesListView.prototype), "init", this).apply(this, arguments);

        this.searchMovies();
      }
    }
    /**
     * @inheritDoc
     */

  }, {
    key: "render",
    value: function render(data) {
      _get(_getPrototypeOf(MoviesListView.prototype), "render", this).apply(this, arguments);

      this.constructor.getElementById('pagination').innerHTML = data['Response'] === 'True' ? this.getPaginationTemplate.apply(this, arguments) : '';
    }
    /**
     * @inheritDoc
     */

  }, {
    key: "getPaginationTemplate",

    /**
     * @param {Object} data
     * @return {String}
     */
    value: function getPaginationTemplate(data) {
      var MOVIES_PER_PAGE = 10;
      var MAX_PAGES_COUNT = 15;
      var pagesCount = Math.ceil(data['totalResults'] / MOVIES_PER_PAGE);
      var searchText = this.getSearchText();
      var currentPage = this.getCurrentPageNum();
      var isFirst = currentPage === 1 ? 'disabled' : '';
      var isLast = currentPage === pagesCount ? 'disabled' : '';
      var middle = (MAX_PAGES_COUNT - 1) / 2;
      var output = "<li class=\"page-item ".concat(isFirst, "\"><a class=\"page-link\" href=\"#").concat(searchText, "/1\">First</a></li>");
      var i = 1;

      if (pagesCount > MAX_PAGES_COUNT) {
        if (pagesCount - currentPage < middle) {
          i = pagesCount - MAX_PAGES_COUNT + 1;
        } else if (currentPage > middle) {
          i = currentPage - middle;
        }
      }

      for (var limit = 1; limit <= pagesCount && limit <= MAX_PAGES_COUNT;) {
        var isActive = currentPage === i ? 'active' : '';
        output += "<li class=\"page-item ".concat(isActive, "\"><a class=\"page-link\" href=\"#").concat(searchText, "/").concat(i, "\">").concat(i, "</a></li>");
        i++;
        limit++;
      }

      output += "<li class=\"page-item ".concat(isLast, "\"><a class=\"page-link\" href=\"#").concat(searchText, "/").concat(pagesCount, "\">Last</a></li>");
      return (0, _utils.$html)(_templateObject(), output);
    }
  }, {
    key: "addListeners",
    value: function addListeners() {
      var _this2 = this;

      (0, _utils.$on)(this.constructor.getElementById('searchForm'), 'submit', function () {
        window.location.hash = "#".concat(_this2.getSearchText(), "/1");
      });
    }
    /**
     * @return {String}
     */

  }, {
    key: "getSearchText",
    value: function getSearchText() {
      return this.constructor.getElementById('searchText').value || '';
    }
    /**
     * @return {Number}
     */

  }, {
    key: "getCurrentPageNum",
    value: function getCurrentPageNum() {
      return +this.constructor.getElementById('pageNumber').value || 1;
    }
  }, {
    key: "searchMovies",
    value: function searchMovies() {
      var _this3 = this;

      fetch("https://www.omdbapi.com/?apikey=".concat(this.constructor.getApiKey(), "&s=").concat(this.getSearchText(), "&page=").concat(this.getCurrentPageNum())).then(function (response) {
        return response.json();
      }).then(function (data) {
        return _this3.render(data);
      })["catch"](function (error) {
        return console.error(error);
      });
    }
  }], [{
    key: "getTemplate",
    value: function getTemplate(data) {
      var movies = data && data['Search'];

      if (!movies) {
        return '<h4>Sorry, no movies were found.</h4>';
      }

      var output = '';

      for (var i = 0; i < movies.length; i++) {
        var movie = movies[i];
        var poster = this.getPoster(movie['Poster']);
        output += "\n                <a href=\"movie.html#".concat(movie['imdbID'], "\" class=\"col-3 m-3 p-0 movie\">\n                    <img class=\"h-100 w-100 movie-poster\" src=\"").concat(poster, "\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"").concat(movie['Title'], "\">\n                    <h4 class=\"m-0 text-truncate\">").concat(movie['Title'], "</h4>\n                </a>\n            ");
      }

      var COLS_PER_ROW = 3;
      var trailingColumns = movies.length % COLS_PER_ROW;

      if (trailingColumns) {
        output += '<div class="col-3 m-3 p-0"></div>'.repeat(COLS_PER_ROW - trailingColumns);
      }

      return (0, _utils.$html)(_templateObject2(), output);
    }
  }]);

  return MoviesListView;
}(_base["default"]);

exports["default"] = MoviesListView;

},{"../utils":3,"./base":4}]},{},[2]);
