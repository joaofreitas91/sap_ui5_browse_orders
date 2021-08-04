sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/odata/v2/ODataModel',
    'sap/ui/model/json/JSONModel',
    'sap/ui/core/BusyIndicator',
    '../model/Formatter'

], function (Controller, ODataModel, JSONModel, BusyIndicator, Formatter) {
    'use strict';
    return Controller.extend("ProjBrowseOrders.browseorders.controller.Detail", {
        Formatter: Formatter,

        onInit: function () {
            // Essa variavel ela vai pegar a rota/caminho 
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

            // Vai pegar a rota no caso Detail e sempre que cair nessa rota vai chamar a função _onObjectMatched
            oRouter.getRoute("Detail").attachPatternMatched(this._onObjectMatched, this);
        },
        onNavback: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("Main")
        },
        _onObjectMatched: function (oEvent) {
            BusyIndicator.show()

            // Vai pegar o ID da Ordem que está sendo recebida no parametro
            var orderPath = oEvent.getParameter("arguments").orderPath
            // Caminho serviço oData passando o ID
            const service = `/Northwind/V2/Northwind/Northwind.svc/`
            // Pergutar ao Alexandre novamente sobre POO
            this.odata = new ODataModel(service)

            this.odata.read(`/Orders( ${orderPath} )`, {
                urlParameters: {
                    "$expand": "Order_Details,Order_Details/Product"
                },
                success: function (res) {
                    console.log(res)
                    // console.log(res.EmployeeID)
                    const model = new JSONModel(res)
                    this.getView().setModel(model, "modelDetail")
                    BusyIndicator.hide()
                }.bind(this),
                error: function (error) {
                    console.log(`Erro de Requisição ${error}`)
                    BusyIndicator.hide()
                }
            })
        }

    })
});