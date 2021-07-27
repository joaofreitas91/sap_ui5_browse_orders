/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"ProjBrowseOrders/browse_orders/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
