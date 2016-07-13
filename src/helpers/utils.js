let uniqueIdsTill = -1;

function charsLeftIndex(string, chars) {
    var index = -1,
        length = string.length;

    while (++index < length && chars.indexOf(string.charAt(index)) > -1) {}
    return index;
}

function charsRightIndex(string, chars) {
    var index = string.length;

    while (index-- && chars.indexOf(string.charAt(index)) > -1) {}
    return index;
}


//let hiddenDiv = document.getElementById('trussExtensionsEventDiv');

function communicateToExtension(data) {
    //if(!hiddenDiv) return;
    //let customEvent = document.createEvent('Event', {
    //    detail: data
    //});
    //customEvent.initEvent('trussExtensionsEvents', true, true);
    //hiddenDiv.dispatchEvent(customEvent);
}

export default {
    communicateToExtension,

    getNextUniqueId:  function () {
        return 'UIF-' + (++uniqueIdsTill);
    },
    pick: function (obj, arr) {
        var o = {};
        arr.forEach(function (key) {
            o[key] = obj[key];
        });

        return o;
    },
    length: function (obj) {
        if (Array.isArray(obj)) {
            return obj.length
        } else if (typeof obj === "object") {
            return Object.keys(obj).length
        } else if (typeof obj === "string") {
            return obj.length
        } else {
            return 0;
        }
    },
    trim: function (string, chars) {
        return string.slice(charsLeftIndex(string, chars), charsRightIndex(string, chars) + 1);
    },
    clearSlashes: function(string) {
        return this.trim(string, "/");
    },
    partial: function (fn /*, args...*/) {
        // A reference to the Array#slice method.
        var slice = Array.prototype.slice;
        // Convert arguments object to an array, removing the first argument.
        var args = slice.call(arguments, 1);

        return function() {
            // Invoke the originally-specified function, passing in all originally-
            // specified arguments, followed by any just-specified arguments.
            return fn.apply(this, args.concat(slice.call(arguments, 0)));
        };
    },

    getCSSSelector: function (instanceConfig, moduleStore) {

		try {
			let cssSelector = `${instanceConfig.instanceConfig.container}`;

			let tempParent = instanceConfig.meta.parent && instanceConfig.meta.parent.pointer ? instanceConfig.meta.parent.pointer : undefined;

			while(tempParent) {
				cssSelector = `${tempParent.instanceConfig.container} ${cssSelector}`;
				tempParent = tempParent.parent && tempParent.parent.pointer ? tempParent.parent.pointer.meta.id : undefined;
			}

			return cssSelector;
		}
		catch(err) {
			return "";
		}
    }
};
