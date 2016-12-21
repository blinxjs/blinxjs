import template from "./template.html";
import "./style.less";
import {PubSubHelper as EventBus} from "../../../../lib";
function show(){
	console.log("show is called");

	EventBus.subscribe({
		eventName: 'something',
		callback: function(){
			console.log("again");
		}
	});

	this.publish("something",{});


}
export default {
    template,
	show
};
