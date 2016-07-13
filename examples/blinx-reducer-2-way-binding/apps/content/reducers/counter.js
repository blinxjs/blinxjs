export default function state(state, action) {
	switch (action.type) {
		case "INCREMENT_COUNTER":
			return {
				count: state.count + 1
			};
		default:
			return {
				count: 0
			}
	}
}
