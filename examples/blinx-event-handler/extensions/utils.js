import _ from "lodash";
import moment from "moment";
import domHelper from "./dom";
import jQuery from "jquery";


function parseSingleDigit(localValue, suffix) {
	var num = localValue.substr(0, 2) + suffix;

	return num.slice(0, 1) + (parseInt(num.slice(1, 2)) ?
		'.' + num.slice(1, num.length) : num.slice(2, num.length));
}

function parseDoubleDigit(localValue, suffix) {
	var num = localValue.substr(0, 3) + suffix;

	return num.slice(0, 2) + (
			parseInt(num.slice(2, 3)) ?
			'.' + num.slice(2, num.length) : num.slice(3, num.length));
}

var utils = {
	isEmpty: _.isEmpty,
	after: _.after,
	get: _.get,
	find: _.find,
	debounce: _.debounce,
	filter: _.filter,
	flatten: _.flatten,
	union: _.union,
	groupBy: _.groupBy,
	reject: _.reject,
	each: _.each,
	pick: _.pick,
	map: _.map,
	throttle: _.throttle,
	pluck: _.pluck,
	reduce: _.reduce,
	zipObject: _.zipObject,
	findIndex: _.findIndex,
	indexOf: _.indexOf,
	contains: _.contains,
	curryRight: _.curryRight,
	object: _.object,
	values: _.values,
	length: _.size,
	assign: _.assign,
	compact: _.compact,
	uniq: _.uniq,
	clone: _.clone,
	cloneDeep: _.cloneDeep,
	remove: _.remove,
	param: jQuery.param,
	difference: _.difference,
	moment: moment,
	extend: _.extend,
	merge: _.merge,
	forEach: _.forEach,

	startsWith: function (needle, haystack) {
		var regEx,
			isStartsWith = false;

		if (!haystack || !needle) {
			return isStartsWith;
		}

		if (String.prototype.startsWith) {
			isStartsWith = haystack.startsWith(needle);
		} else {
			regEx = new RegExp('^' + needle);
			isStartsWith = regEx.test(haystack);
		}

		return isStartsWith;
	},

	endsWith: function (needle, haystack) {
		var regEx,
			isEndsWith;

		if (String.prototype.endsWith) {
			isEndsWith = haystack.endsWith(needle);
		} else {
			regEx = new RegExp(needle + "$");
			isEndsWith = regEx.test(haystack);
		}

		return isEndsWith;
	},

	stripHtmlTags: function (html) {
		var divEl;

		if (!html) {
			return null;
		}

		divEl = document.createElement("div").innerHTML = html;
		return divEl.textContent || divEl.innerText || html.replace(/(<([^>]+)>)/ig, "");
	},

	clearSlashes: function (string) {
		return _.trim(string, "/");
	},

	isObject: function (obj) {
		return (typeof obj === "object");
	},

	isArray: function (obj) {
		return _.isArray(obj);
	},

	isNumeric: function (obj) {
		return !Array.isArray(obj) && (obj - parseFloat(obj) + 1) >= 0;
	},

	isNumber: function () {
		throw new Error("notImplementedException");
	},

	isString: function (string) {
		return ((typeof string === "string") || (string instanceof String));
	},

	isFunction: function (object) {
		return (typeof object === "function");
	},

	isValidUrl: function (url) {
		return /^(?:(?:(?:https?|ftp):)?\/\/)?(?:\S+)?(?::\d{1,5})?(?:[/?#]\S*)?$/i.test(url);
	},

	loadScript: function (src, isAsync) {
		var scriptEl,
			firstScriptEl;

		return PromiseHelper.getPromise(function (resolve, reject) {
			scriptEl = document.createElement('script');
			scriptEl.type = 'text/javascript';
			scriptEl.async = isAsync || false;
			scriptEl.src = src;

			scriptEl.onload = scriptEl.onreadystatechange = function () {
				if ((this.readyState) && (this.readyState != 'complete') && (this.readyState != 'loaded')) {
					return;
				}

				resolve();
			};

			scriptEl.onerror = function () {
				reject();
			};

			firstScriptEl = document.getElementsByTagName('script')[0];
			firstScriptEl.parentNode.insertBefore(scriptEl, firstScriptEl);
		});
	},

	scrollTo: function (target, options) {
		var targetEl = $(target),
			targetElOffset = targetEl.offset();

		domHelper.getDomNode("#content-container").animate({
			scrollTop: (targetElOffset.top - options.paddingTop)
		}, options.duration, options.onComplete);
	},

	intersection: _.intersection,

	includesState: function (needle, haystack) {
		var ishaveState = false;
		if (!haystack || !needle) {
			return ishaveState;
		}

		if (utils.startsWith(needle, haystack)) {
			if (haystack[needle.length] === '.' || haystack[needle.length] === undefined) {
				ishaveState = true;
			}
		}
		return ishaveState;
	},

	formatNumberIn: function (value) {
		var formattedValue;
		value += '';

		switch (value.length) {
			case 4:
				formattedValue = parseSingleDigit(value, ' T');
				break;
			case 5:
				formattedValue = parseDoubleDigit(value, ' T');
				break;
			case 6:
				formattedValue = parseSingleDigit(value, ' L');
				break;
			case 7:
				formattedValue = parseDoubleDigit(value, ' L');
				break;
			case 8:
				formattedValue = parseSingleDigit(value, ' C');
				break;
			case 9:
				formattedValue = parseDoubleDigit(value, ' C');
				break;
			case 10:
				formattedValue = value.substr(0, 3) + ' C';
				break;
			default:
				formattedValue = value;
				break;
		}

		return formattedValue;
	},

	formatCurrency: function (value) {
		var afterPoint = '',
			lastThree,
			otherNumbers;

		if (isNaN(value)) {
			return value;
		}

		value = value.toString();

		if (value.indexOf('.') > 0) {
			afterPoint = value.substring(value.indexOf('.'), value.length);
		}
		value = Math.floor(value);
		value = value.toString();

		lastThree = value.substring(value.length - 3);
		otherNumbers = value.substring(0, value.length - 3);

		if (otherNumbers != '') {
			lastThree = ',' + lastThree;
		}
		return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
	},

	isVisibleInContainer: function (domNode, containerNode, boundaryConditions) {
		var isVisibleInContainer = false,
			containerNode = containerNode || domHelper.getDomNode("body"),
			domNodeBoundingClientRect = domNode.getBoundingClientRect(),
			containerNodeBoundingClientRect = containerNode.getBoundingClientRect(),
			boundaryConditions = boundaryConditions || {
					top: true,
					bottom: true
				};

		if (boundaryConditions.top) {
			isVisibleInContainer = (domNodeBoundingClientRect.top >= containerNodeBoundingClientRect.top);
		}

		if (boundaryConditions.bottom) {
			isVisibleInContainer = (domNodeBoundingClientRect.bottom <= containerNodeBoundingClientRect.bottom);
		}

		return isVisibleInContainer;
	},

	capitalize: function (strn) {
		if (strn) {
			var str = strn.toLowerCase();
			var newStrArr = str.split('_'),
				newStr = "";
			var isUnderscorePresent = (str.indexOf('_') > -1);
			for (var i = 0; i < newStrArr.length; i++) {
				newStr += newStrArr[i].charAt(0).toUpperCase() +
					newStrArr[i].substring(1) + (isUnderscorePresent ? ' ' : '');
			}

			return newStr;
		} else {
			return "";
		}

	}
};

export default {
	find: utils.find,
	get: utils.get,
	debounce: utils.debounce,
	filter: utils.filter,
	after:utils.after,
	flatten: utils.flatten,
	union: utils.union,
	groupBy: utils.groupBy,
	reject: utils.reject,
	each: utils.each,
	pick: utils.pick,
	assign: utils.assign,
	compact: utils.compact,
	uniq: utils.uniq,
	clone: utils.clone,
	cloneDeep: utils.cloneDeep,
	remove: utils.remove,
	isEmpty: utils.isEmpty,
	difference: utils.difference,
	extend: utils.extend,
	merge: utils.merge,
	map: utils.map,
	startsWith: utils.startsWith,
	endsWith: utils.endsWith,
	stripHtmlTags: utils.stripHtmlTags,
	clearSlashes: utils.clearSlashes,
	loadScript: utils.loadScript,
	throttle: utils.throttle,
	pluck: utils.pluck,
	reduce: utils.reduce,
	zipObject: utils.zipObject,
	object: utils.object,
	values: utils.values,
	length: utils.length,
	isObject: utils.isObject,
	isArray: utils.isArray,
	isNumber: utils.isNumber,
	isString: utils.isString,
	isFunction: utils.isFunction,
	isValidUrl: utils.isValidUrl,
	findIndex: utils.findIndex,
	indexOf: utils.indexOf,
	contains: utils.contains,
	isNumeric: utils.isNumeric,
	curryRight: utils.curryRight,
	capitalize: utils.capitalize,
	intersection: _.intersection,
	moment: utils.moment,
	scrollTo: utils.scrollTo,
	formatNumberIn: utils.formatNumberIn,
	formatCurrency: utils.formatCurrency,
	includesState: utils.includesState,
	param: utils.param,
	isVisibleInContainer: utils.isVisibleInContainer,
	forEach: utils.forEach
};
