import template from "./template.html";

export default {
    addTimestamp: function(dateArr){

        var list = document.querySelector(".timestamp-list");

        if(list) {
            let html = "";
            if(dateArr.length){
                html = dateArr.map((time)=>{
                    return `<li>${time}</li>`
                }).join("");
            }

            list.innerHTML = html;
        }
    },
    template,
    config: {}
};