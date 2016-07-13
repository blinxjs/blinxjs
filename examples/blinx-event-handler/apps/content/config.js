export default {
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
		},{
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
