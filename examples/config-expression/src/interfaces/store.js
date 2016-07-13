let moduleS = Object.assign([], {

    insertInstance: function (instance, path) {
        let pointer;
        if (path) {
            pointer = this.getObjByPath(path);
        } else {
            pointer = this;
        }
        pointer.push(instance);
    },

    deleteInstance: function (name) {

        for (var i= this.length-1; i>=0; i--) {
            if (this[i].moduleName === name) {
                this.splice(i, 1);
                break;
            }
        }
    },

    findInstance: function (name) {
        return this.filter(function (module) {
            if(module.moduleName === name){
                return module;
            }
        });
    },

    overrideInstance: function (path, searchKey, searchValue, overrideData, searchInAll) {
        let pointer;

        if (path) {
            pointer = this.getObjByPath(path);
        } else {
            pointer = this;
        }

        for (var key in overrideData) {
            pointer[key] = overrideData[key];
        }
    }
});

let isBrowser = typeof window !== "undefined";

let isServer = !isBrowser;

let subscriptions = {};

let eventQ = {store: []};

export {
    isBrowser,
    subscriptions,
    moduleS,
    isServer,
    eventQ
};