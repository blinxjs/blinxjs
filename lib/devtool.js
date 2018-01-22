/**
 * Created by anoof.shaikh on 03/01/17.
 */

var attachListener = function attachListener(moduleObject) {
	document.addEventListener('content-script-to-blinx', function (event) {
		var message = void 0;
		var moduleData = function moduleData() {
			var returnObject = [];
			// var objectToParse = _store.moduleS;
			var objectToParse = moduleObject();
			objectToParse.forEach(function (module, moduleIndex) {
				var subModulesArray = function subModulesArray(thisModule) {
					if (!thisModule.config || !thisModule.config.modules) {
						return [];
					}

					var returnArr = [];
					thisModule.config.modules.forEach(function (subModule, subModuleIndex) {
						returnArr.push({
							moduleName: subModule.moduleName,
							moduleConfig: {
								container: subModule.instanceConfig.container,
								listensTo: subModule.instanceConfig.listensTo,
								placeholders: JSON.stringify(subModule.instanceConfig.placeholders)
							},
							subModules: subModulesArray(subModule),
							moduleInstanceConfig: JSON.stringify(subModule.instanceConfig)
						});
					});
					return returnArr;
				};
				var moduleObj = {
					moduleName: module.moduleName,
					moduleConfig: {
						container: module.instanceConfig.container,
						listensTo: module.instanceConfig.listensTo,
						placeholders: JSON.stringify(module.instanceConfig.placeholders)
					},
					subModules: subModulesArray(module),
					moduleInstanceConfig: JSON.stringify(module.instanceConfig)
				};
				returnObject.push(moduleObj);
			});
			return returnObject;
		};

		switch (event.detail.eventId) {
			case 'GET_MODULES':
				message = { eventId: 'GET_MODULES_REPONSE', data: moduleData() };
				break;
		}
		var event = new CustomEvent('blinx-to-content-script', { bubbles: true, detail: message });
		document.dispatchEvent(event);
	});
};

export default {
	attachListener: attachListener
};