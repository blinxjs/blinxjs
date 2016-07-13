import template from "./template.html";

export default {
    data: [],
    addTimestamp: function(date){
        var list = document.querySelector(".timestamp-list");

        if(list) {
            let html = "";
            if(this.data.length){
                html = this.data.map((time)=>{
                    return `<li>${time}</li>`
                }).join("");
            }

            list.innerHTML += html + `<li>${date}</li>`;
			this.data = [];
        } else {
            this.data.push(date);
        }
    },
    template,
    config: {}
};
