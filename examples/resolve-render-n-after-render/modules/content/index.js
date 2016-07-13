import template from "./template.html";

export default {
    resolveRenderOn: function(){
       return new Promise((res, rej) => {
            return res({
                key: "Name",
                value: "Value"
            })
       });
    },
    onRenderCompelete: function(){
        console.log(this.getParentInstanceId());
        console.log("On render completed....DOM for module is now available");
    },
	destroy: function(){
		console.log("Destroy called");
	},
	onStatusChange: function(event){
		console.log(event);
	},
    template,
    config: {}
};
