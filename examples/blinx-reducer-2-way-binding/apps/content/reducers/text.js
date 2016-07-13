let defaultVal = {
	"value": "ASDF"
};

export default function state(state = defaultVal, action) {
	switch (action.type) {
		case "CHANGE_TEXT":
			return Object.assign({}, action);
		default:
			return Object.assign({}, state);
	}
}
