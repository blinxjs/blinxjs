let uniqueIdsTill = -1;

function charsLeftIndex(string, chars) {
	let index  = -1,
		length = string.length;

	while (++index < length && chars.indexOf(string.charAt(index)) > -1) {
	}
	return index;
}

function charsRightIndex(string, chars) {
	let index = string.length;

	while (index-- && chars.indexOf(string.charAt(index)) > -1) {
	}
	return index;
}

export default {

	getNextUniqueId() {
		return `blinx-wrapper-${++uniqueIdsTill}`;
	},

	pick(obj, arr) {
		const o = {};
		arr.forEach((key) => {
			o[key] = obj[key];
		});

		return o;
	},

	length(obj) {
		if (Array.isArray(obj)) {
			return obj.length;
		} else if (typeof obj === 'object') {
			return Object.keys(obj).length;
		} else if (typeof obj === 'string') {
			return obj.length;
		}
		return 0;
	},

	trim(string, chars) {
		return string.slice(charsLeftIndex(string, chars), charsRightIndex(string, chars) + 1);
	},

	clearSlashes(string) {
		return this.trim(string, '/');
	},

	partial(fn /* , args... */) {
		// A reference to the Array#slice method.
		const slice = Array.prototype.slice;
		// Convert arguments object to an array, removing the first argument.
		const args  = slice.call(arguments, 1);

		return function () {
			// Invoke the originally-specified function, passing in all originally-
			// specified arguments, followed by any just-specified arguments.
			return fn.apply(this, args.concat(slice.call(arguments, 0)));
		};
	},

	getCSSSelector(instanceConfig, moduleStore) {
		try {
			let cssSelector = `${instanceConfig.instanceConfig.container}`;

			let tempParent = instanceConfig.meta.parent && instanceConfig.meta.parent.pointer ? instanceConfig.meta.parent.pointer : undefined;

			while (tempParent) {
				cssSelector = `${tempParent.instanceConfig.container} ${cssSelector}`;
				tempParent  = tempParent.meta.parent && tempParent.meta.parent.pointer ? tempParent.meta.parent.pointer : undefined;
			}

			return cssSelector;
		} catch (err) {
			return '';
		}
	},

	configValidator(config) {
		let isValid = true;

		if (!config) {
			console.error('Config is mandatory to create instance of any module.');
			isValid = false;
		}

		if (!config.moduleName) {
			console.error('moduleName property on config is require field to create instance of any module.');
			isValid = false;
		}

		if (typeof config.moduleName !== 'string') {
			console.error('moduleName property on config should be string.');
			isValid = false;
		}

		if (!config.module || typeof config.module !== 'object') {
			console.error('module property on config is mandatory and should be object');
			isValid = false;
		}

		if (!config.instanceConfig || (config.instanceConfig && !config.instanceConfig.container)) {
			console.error('instanceConfig property and instanceConfig.container is mandatory');
			isValid = false;
		}

		if (!isValid) {
			console.dirxml(config);
		}

		return isValid;
	},
};
