module.exports = {
    "Basic Truss Application Loads": function (browser) {
        browser
            .url("http://127.0.0.1:8080/basic-app/")
			.getLog('browser', function(result) {
				console.log(result);
			})
            .waitForElementVisible('body', 1000)
            .waitForElementVisible('#app-container', 10000)
            .waitForElementVisible('#header-container', 100)
            .assert.containsText("#header-container h3", "Header")
            .waitForElementVisible('#content-container', 100)
            .assert.containsText("#content-container section", "Content")
            .waitForElementVisible('#footer-container', 100)
            .assert.containsText("#footer-container footer", "Footer")
            .end();
    },

    "Truss initOn works": function (browser) {
        browser
            .url("http://127.0.0.1:8080/initon-app/")
			.getLog('browser', function(result) {
				console.log(result);
			})
			.waitForElementVisible('body', 1000)
            .waitForElementVisible('#app-container', 100)
            .waitForElementVisible('#header-container', 100)
            .assert.containsText("#header-container h3", "Header")
            .waitForElementVisible('#content-container', 3500)
            .assert.containsText("#content-container section", "Content")
            .waitForElementVisible('#footer-container', 3500)
            .assert.containsText("#footer-container footer", "Footer")
            .end();
    },

    "Truss listensTo 'KEEP_ON' works": function (browser) {
        browser
            .url("http://127.0.0.1:8080/listensto-app-keep_on/")
			.getLog('browser', function(result) {
				console.log(result);
			})
            .waitForElementVisible('body', 1000)
            .waitForElementVisible('#app-container', 100)
            .waitForElementVisible('#header-container', 100)
            .assert.containsText("#header-container h3", "Header")
            .click("#emitter")
            .click("#emitter")
            .click("#emitter")
            .waitForElementVisible('#content-container', 3500)
            .click("#emitter")
            .elements("css selector",".timestamp-list li", function(result){
                browser.assert.equal(result.value.length, 4);
            })
            .assert.containsText("#content-container section", "Content")
            .waitForElementVisible('#footer-container', 100)
            .assert.containsText("#footer-container footer", "Footer")
            .end();
    },

    "Truss listensTo 'PLAY_AFTER_RENDER' works": function (browser) {
        browser
            .url("http://127.0.0.1:8080/listensto-app-play_after_render/")
			.getLog('browser', function(result) {
				console.log(result);
			})
            .waitForElementVisible('body', 1000)
            .waitForElementVisible('#app-container', 100)
            .waitForElementVisible('#header-container', 100)
            .assert.containsText("#header-container h3", "Header")
            .click("#emitter")
            .click("#emitter")
            .click("#emitter")
            .waitForElementVisible('#content-container', 3500)
            .click("#emitter")
            .elements("css selector",".timestamp-list li", function(result){
                browser.assert.equal(result.value.length, 1);
            })
            .assert.containsText("#content-container section", "Content")
            .waitForElementVisible('#footer-container', 100)
            .assert.containsText("#footer-container footer", "Footer")
            .end();
    },

    "Truss listensTo 'REPLAY' works": function (browser) {
        browser
            .url("http://127.0.0.1:8080/listensto-app-replay/")
			.getLog('browser', function(result) {
				console.log(result);
			})
            .waitForElementVisible('body', 1000)
            .waitForElementVisible('#app-container', 100)
            .waitForElementVisible('#header-container', 100)
            .assert.containsText("#header-container h3", "Header")
            .click("#emitter")
            .click("#emitter")
            .click("#emitter")
            .waitForElementVisible('#content-container', 3500)
            .click("#emitter")
            .elements("css selector",".timestamp-list li", function(result){
                browser.assert.equal(result.value.length, 4);
            })
            .assert.containsText("#content-container section", "Content")
            .waitForElementVisible('#footer-container', 100)
            .assert.containsText("#footer-container footer", "Footer")
            .end();
    },

    "Truss resolveRenderOn, onRenderCompelete & destroy works": function (browser) {
        browser
            .url("http://127.0.0.1:8080/resolve-render-%26-after-render/")
			.getLog('browser', function(result) {
				console.log(result);
			})
            .waitForElementVisible('body', 1000)
            .waitForElementVisible('#app-container', 100)
            .waitForElementVisible('#header-container', 100)
            .assert.containsText("#header-container h3", "Header")
            .waitForElementVisible('#content-container', 100)
            .assert.containsText("#content-container .promise-response", "Name: Value")
            .waitForElementVisible('#footer-container', 100)
            .assert.containsText("#footer-container footer", "Footer");

        browser.expect.element('#content-container').to.not.be.present.after(6000);
        browser.end();
    }
};
