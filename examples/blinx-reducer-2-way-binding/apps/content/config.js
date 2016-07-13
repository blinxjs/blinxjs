export default {
	reduxConfig: {
		store: {
			counter: {
				count: 0
			},
			text: "Lorem Ipsum",
			extract: {
				value: "Ipsum Lorem"
			}
		},
		events: {
			"click": [{
				"selectors": ["button"],
				"type": "INCREMENT_COUNTER",
				"callback": "incrementCounter"
			}],
			"keyup": [{
				"selectors": [".text-input"],
				"which": [13],
				"type": "CHANGE_TEXT",
				"extract": {
					value: "val"
				},
				"callback": "showConsoleMessage"
			}, {
				"selectors": [".extract-input"],
				"type": "CHANGE_EXTRACT",
				"extract": {
					value: "val",
					id: "getData#id",
					style: "attr#style"
				},
				"callback": "showConsoleMessage"
			}]
		}
	},
	domEvents: {
		"click": [{
			"selectors": ["button"],
			"callback": "incrementCounter"
		}],
		"keyup": [{
			"selectors": [".text-input"],
			"which": [13],
			"extract": {
				value: "val"
			},
			"callback": "showConsoleMessage"
		}, {
			"selectors": [".extract-input"],
			"extract": {
				value: "val",
				id: "getData#id",
				style: "attr#style"
			},
			"callback": "showConsoleMessage"
		}]
	}
}
