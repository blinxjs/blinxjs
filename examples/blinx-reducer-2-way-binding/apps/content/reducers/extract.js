let defaultVal = {
	"value": "ASDF",
	"id": 4567,
	"style": "border-bottom-color: rgb(0, 68, 68);"
};

export default function state(state = defaultVal, action) {
	switch (action.type) {
		case "CHANGE_EXTRACT":
			return Object.assign({}, action);
		default:
			return Object.assign({}, state);
	}
}
