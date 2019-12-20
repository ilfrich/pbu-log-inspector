"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _LogInspectorForm = _interopRequireDefault(require("./LogInspectorForm"));

var _LogInspectorResult = _interopRequireDefault(require("./LogInspectorResult"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var DATE_FORMAT = "YYYY-MM-DD";

var LogInspectorContainer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(LogInspectorContainer, _React$Component);

  function LogInspectorContainer(props) {
    var _this;

    _classCallCheck(this, LogInspectorContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LogInspectorContainer).call(this, props));
    _this.state = {
      fetching: false,
      level: "info.log",
      date: (0, _moment["default"])().format(DATE_FORMAT),
      logs: [],
      filter: ""
    };
    _this.getLogs = _this.getLogs.bind(_assertThisInitialized(_this));
    _this.changeDate = _this.changeDate.bind(_assertThisInitialized(_this));
    _this.changeFilter = _this.changeFilter.bind(_assertThisInitialized(_this));
    _this.changeLevel = _this.changeLevel.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(LogInspectorContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getLogs();
    }
  }, {
    key: "getLogs",
    value: function getLogs() {
      var _this2 = this;

      // compile url
      var apiPrefix = this.props.apiPrefix || "/api";
      var url = "".concat(apiPrefix, "/_logs?date=").concat(this.state.date);

      if (this.state.level != null) {
        url += "&level=".concat(this.state.level);
      } // compile request options


      var requestOptions = {};

      if (this.props.applyRequestOptions != null) {
        requestOptions = this.props.applyRequestOptions(requestOptions);
      } // get log messages


      this.setState({
        fetching: true
      });
      fetch(url, requestOptions).then(function (res) {
        // parse response
        if (res.status === 200) {
          return res.json();
        }

        throw Error("Logs could not be loaded: (".concat(res.status, ") ").concat(res.text()));
      }).then(function (logs) {
        // success, store logs
        _this2.setState({
          logs: logs.sort(function (a, b) {
            return a.timestamp - b.timestamp;
          }),
          fetching: false
        });
      })["catch"](function (err) {
        // wrong status code or invalid payload
        _this2.setState({
          fetching: false
        });

        if (_this2.props.errorHandler) {
          _this2.props.errorHandler(err);
        }
      });
    }
  }, {
    key: "changeFilter",
    value: function changeFilter(newFilter) {
      this.setState({
        filter: newFilter
      });
    }
  }, {
    key: "changeLevel",
    value: function changeLevel(newLevel) {
      this.setState({
        level: newLevel
      });
    }
  }, {
    key: "changeDate",
    value: function changeDate(newDate) {
      this.setState({
        date: newDate
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", null, _react["default"].createElement(_LogInspectorForm["default"], {
        filter: this.state.filter,
        level: this.state.level,
        date: this.state.date,
        changeDate: this.changeDate,
        changeLevel: this.changeLevel,
        changeFilter: this.changeFilter,
        fetch: this.getLogs
      }), _react["default"].createElement(_LogInspectorResult["default"], {
        logs: this.state.logs,
        filter: this.state.filter
      }));
    }
  }]);

  return LogInspectorContainer;
}(_react["default"].Component);

var _default = LogInspectorContainer;
exports["default"] = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var style = {
  container: {
    padding: "10px",
    border: "1px solid #ccc",
    background: "#f6f6f6",
    width: "calc(100% - 20px)"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "150px 150px 100px 1fr",
    gridColumnGap: "10px"
  },
  label: {
    fontWeight: "bold",
    fontSize: "12px",
    width: "100%",
    marginBottom: "10px",
    display: "block",
    textDecoration: "underline"
  },
  buttonContainer: {
    paddingTop: "25px",
    paddingLeft: "5px",
    borderRight: "1px solid #ccc"
  },
  button: {
    background: "#666",
    color: "#fff",
    border: "none",
    padding: "7px 5px"
  },
  formElement: {
    padding: "5px",
    width: "calc(100% - 10px)"
  }
};
var LOG_LEVELS = {
  INFO: "info.log",
  ERROR: "error.log",
  DEBUG: "debug.log",
  WARNING: "warning.log"
};

var LogInspectorForm =
/*#__PURE__*/
function (_React$Component) {
  _inherits(LogInspectorForm, _React$Component);

  function LogInspectorForm(props) {
    var _this;

    _classCallCheck(this, LogInspectorForm);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LogInspectorForm).call(this, props));
    _this.changeDate = _this.changeDate.bind(_assertThisInitialized(_this));
    _this.changeFilter = _this.changeFilter.bind(_assertThisInitialized(_this));
    _this.changeLevel = _this.changeLevel.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(LogInspectorForm, [{
    key: "changeLevel",
    value: function changeLevel() {
      this.props.changeLevel(this.level.value);
    }
  }, {
    key: "changeDate",
    value: function changeDate() {
      if (this.date.value != null && this.date.value !== "") {
        // only allow valid dates
        this.props.changeDate(this.date.value);
      }
    }
  }, {
    key: "changeFilter",
    value: function changeFilter() {
      this.props.changeFilter(this.filter.value);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react["default"].createElement("div", {
        style: style.container
      }, _react["default"].createElement("div", {
        style: style.grid
      }, _react["default"].createElement("div", null, _react["default"].createElement("label", {
        htmlFor: "level",
        style: style.label
      }, "Log Level"), _react["default"].createElement("select", {
        id: "level",
        defaultValue: this.props.level,
        onChange: this.changeLevel,
        ref: function ref(el) {
          _this2.level = el;
        },
        style: style.formElement
      }, Object.keys(LOG_LEVELS).map(function (level) {
        return _react["default"].createElement("option", {
          key: level,
          value: LOG_LEVELS[level]
        }, level);
      }))), _react["default"].createElement("div", null, _react["default"].createElement("label", {
        htmlFor: "date",
        style: style.label
      }, "Date"), _react["default"].createElement("input", {
        id: "date",
        type: "date",
        defaultValue: this.props.date,
        ref: function ref(el) {
          _this2.date = el;
        },
        onChange: this.changeDate,
        style: style.formElement
      })), _react["default"].createElement("div", {
        style: style.buttonContainer
      }, _react["default"].createElement("button", {
        type: "button",
        onClick: this.props.fetch,
        style: _objectSpread({}, style.formElement, {}, style.button)
      }, "Fetch")), _react["default"].createElement("div", null, _react["default"].createElement("label", {
        htmlFor: "filter",
        style: style.label
      }, "Filter"), _react["default"].createElement("input", {
        type: "text",
        defaultValue: this.props.filter,
        onChange: this.changeFilter,
        style: style.formElement,
        ref: function ref(el) {
          _this2.filter = el;
        }
      }))));
    }
  }]);

  return LogInspectorForm;
}(_react["default"].Component);

var _default = LogInspectorForm;
exports["default"] = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var style = {
  resultContainer: {
    paddingTop: "15px"
  },
  noEntries: {
    width: "100%",
    paddingTop: "15px",
    textAlign: "center"
  },
  listContainer: {
    display: "grid",
    gridTemplateColumns: "250px 1fr",
    gridColumnGap: "5px",
    padding: "10px 0px",
    borderBottom: "1px solid #ddd"
  },
  header: {
    padding: "10px",
    background: "#666",
    color: "#fff",
    fontSize: "13px",
    fontWeight: "600",
    textAlign: "center"
  },
  highlight: {
    background: "#ff9"
  },
  link: {
    color: "#2196f3",
    cursor: "pointer",
    paddingTop: "5px",
    display: "inline-block"
  }
};

var LogInspectorResult =
/*#__PURE__*/
function (_React$Component) {
  _inherits(LogInspectorResult, _React$Component);

  function LogInspectorResult(props) {
    var _this;

    _classCallCheck(this, LogInspectorResult);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LogInspectorResult).call(this, props));
    _this.state = {
      filterMatch: false,
      expand: {}
    };
    _this.filterLogs = _this.filterLogs.bind(_assertThisInitialized(_this));
    _this.changeFilterMatch = _this.changeFilterMatch.bind(_assertThisInitialized(_this));
    _this.truncateMessages = _this.truncateMessages.bind(_assertThisInitialized(_this));
    _this.toggleIndex = _this.toggleIndex.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(LogInspectorResult, [{
    key: "filterLogs",
    value: function filterLogs(allLogs) {
      var _this2 = this;

      return allLogs.filter(function (item) {
        return _this2.props.filter === "" || item.message.filter(function (item) {
          return item.toLowerCase().indexOf(_this2.props.filter.toLowerCase()) !== -1;
        }).length > 0;
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.filter !== this.props.filter) {
        this.setState({
          expand: {}
        });
      }
    }
  }, {
    key: "changeFilterMatch",
    value: function changeFilterMatch() {
      this.setState({
        filterMatch: this.filterMatch.checked
      });
    }
  }, {
    key: "truncateMessages",
    value: function truncateMessages(index, messages) {
      if (this.state.expand[index] === true) {
        return messages;
      }

      return [messages[0]];
    }
  }, {
    key: "toggleIndex",
    value: function toggleIndex(index) {
      var _this3 = this;

      return function () {
        _this3.setState(function (oldState) {
          var expand = oldState.expand;
          expand[index] = expand[index] == null || expand[index] === false;
          return _objectSpread({}, oldState, {
            expand: expand
          });
        });
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      // handle filtering
      var allLogs = this.state.filterMatch ? this.filterLogs(this.props.logs) : this.props.logs;

      var matchFilter = _react["default"].createElement("div", null, _react["default"].createElement("div", null, _react["default"].createElement("input", {
        type: "checkbox",
        id: "show-match",
        onChange: this.changeFilterMatch,
        ref: function ref(el) {
          _this4.filterMatch = el;
        },
        defaultChecked: this.state.filterMatch
      }), " ", _react["default"].createElement("label", {
        htmlFor: "show-match"
      }, "Show Only Matching Messages")));

      if (allLogs.length === 0) {
        // no logs available
        return _react["default"].createElement("div", {
          style: style.resultContainer
        }, matchFilter, _react["default"].createElement("div", {
          style: style.noEntries
        }, _react["default"].createElement("em", null, "No log messages for the selected search criteria")));
      } // helper


      var highLightHelper = function highLightHelper(msg) {
        if (_this4.props.filter === "") {
          // no filter
          return msg;
        }

        var index = msg.toLowerCase().indexOf(_this4.props.filter.toLowerCase());
        var subMessage = msg;

        if (index === -1) {
          // no match
          return msg;
        }

        var result = [];
        var token = 0;

        while (index !== -1) {
          if (index > 0) {
            result.push(_react["default"].createElement("span", {
              key: token
            }, subMessage.substring(0, index)));
            token += 1;
          }

          result.push(_react["default"].createElement("span", {
            key: token,
            style: style.highlight
          }, subMessage.substring(index, index + _this4.props.filter.length)));
          token += 1;
          subMessage = subMessage.substring(index + _this4.props.filter.length);
          index = subMessage.toLowerCase().indexOf(_this4.props.filter.toLowerCase());
        }

        if (subMessage.length > 0) {
          result.push(_react["default"].createElement("span", {
            key: token + 1
          }, subMessage));
        }

        return result;
      };

      return _react["default"].createElement("div", {
        style: style.resultContainer
      }, matchFilter, _react["default"].createElement("div", {
        style: style.listContainer
      }, _react["default"].createElement("div", {
        style: style.header
      }, "Date/Time"), _react["default"].createElement("div", {
        style: style.header
      }, "Message")), allLogs.map(function (log, entryIndex) {
        return _react["default"].createElement("div", {
          style: style.listContainer,
          key: entryIndex
        }, _react["default"].createElement("div", null, (0, _moment["default"])(log.timestamp * 1000).format()), _react["default"].createElement("div", null, _this4.truncateMessages(entryIndex, log.message).map(function (msg, msgIndex) {
          return _react["default"].createElement("div", {
            key: entryIndex * 1000 + msgIndex
          }, highLightHelper(msg));
        }), log.message.length > 1 ? _react["default"].createElement("div", null, _react["default"].createElement("span", {
          onClick: _this4.toggleIndex(entryIndex),
          style: style.link
        }, _this4.state.expand[entryIndex] ? "Show Less" : "Show More")) : null));
      }));
    }
  }]);

  return LogInspectorResult;
}(_react["default"].Component);

var _default = LogInspectorResult;
exports["default"] = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _LogInspectorContainer = _interopRequireDefault(require("./LogInspectorContainer"));

var _LogInspectorForm = _interopRequireDefault(require("./LogInspectorForm"));

var _LogInspectorResult = _interopRequireDefault(require("./LogInspectorResult"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  LogInspectorContainer: _LogInspectorContainer["default"],
  LogInspectorForm: _LogInspectorForm["default"],
  LogInspectorResult: _LogInspectorResult["default"]
};
exports["default"] = _default;
