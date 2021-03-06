import template from "./template.html";
import "./style.less";

import config from "./config";
import Reducers from "./reducers";

export default {
	reducers: Reducers,
	config,
	incrementCounter: function(){
		++this.counter;
		console.log(this.counter);
	},
	showConsoleMessage: function(message){
		let msg = message;

		if(typeof message === "object"){
			msg = JSON.stringify(message);
		}

		console.log(msg);
	},
	counter: 0,
    template
};
