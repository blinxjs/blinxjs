import template from "./template.html";
import "./style.less";
function onRenderComplete(){
	var that = this;
	setTimeout(function(){
		that.publish("HEADER_EVENT",{});
	},3000);
}

export default {
    template,
	onRenderComplete
};
