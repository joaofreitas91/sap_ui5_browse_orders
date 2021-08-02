sap.ui.define([
    'sap/ui/core/mvc/Controller'
], function (Controller) {
    'use strict';
    return Controller.extend("ProjBrowseOrders.browseorders.controller.Detail", {

        onInit: function () {
            debugger
            // Essa variavel ela vai pegar a rota/caminho 
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

            // Vai pegar a rota no caso Detail e sempre que cair nessa rota vai chamar a função _onObjectMatched
            oRouter.getRoute("Detail").attachPatternMatched(this._onObjectMatched, this);
        },
        _onObjectMatched: function (oEvent) {
            var orderPath = oEvent.getParameter("arguments").orderPath
        }
    })
});