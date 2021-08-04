sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/odata/v2/ODataModel',
    'sap/ui/model/json/JSONModel',
    '../model/Formatter',
    'sap/ui/core/BusyIndicator',
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",

], function (Controller, ODataModel, JSONModel, Formatter, BusyIndicator, Filter, FilterOperator) {
    'use strict';

    return Controller.extend("ProjBrowseOrders.browseorders.controller.Main", {
        Formatter: Formatter,

        onInit: function () {
            // this.byId("listOrders").setBusy(true)
            BusyIndicator.show()

            const service = "/Northwind/V2/Northwind/Northwind.svc/"
            // const person = {
            //     headers: { "Content-ID": "0" }
            // }
            this.odata = new ODataModel(service)

            this.odata.read("/Orders", {
                urlParameters: {
                    "$expand": "Customer"
                },
                success: function (response) {
                    console.log(response.results[0])

                    const model = new JSONModel(response.results)
                    this.getView().setModel(model, "modelOrders")
                    BusyIndicator.hide()
                }.bind(this),

                error: function (error) {
                    console.error("Erro requisição" + error)
                    BusyIndicator.hide()
                }
            })
        },
        onSearch: function (oEvent) {
            // add filter for search // adicionar filtro da pesquisa
            var aFilters = []; //Array que vai receber os dados para serem filtrados
            var sQuery = oEvent.getSource().getValue(); // Variavel que vai pegar o valor que está no Search Field da View
            if (sQuery && sQuery.length > 0) { // Se o campo de pesquisa não for vazio

                var filter = new Filter({
                    filters: [
                        new Filter("OrderID", FilterOperator.EQ, sQuery),
                        new Filter("Customer/CompanyName", FilterOperator.Contains, sQuery)
                    ],
                    and: false
                })

                // var filter = new Filter("OrderID", FilterOperator.EQ, sQuery); // Variavel para criar uma nova pesquisa vendo se tem algo EQ(igual) dentro de Order ID
                // var filterTwo = new Filter("Customer/CompanyName", FilterOperator.Contains, sQuery); // Variavel para criar uma nova pesquisa
                aFilters.push(filter); // adicionar o que esta sendo pesquisado
            }

            // update list binding
            var oList = this.byId("listOrders"); //pega o id da lista
            var oBinding = oList.getBinding("items"); //Pega os items da lista 
            oBinding.filter(aFilters);
        },
        navDetail: function (oEvent) {
            var oOrders = oEvent.getSource().getBindingContext("modelOrders").getObject()
            var orderID = oOrders.OrderID
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo('Detail', {
                orderPath: orderID
            })
        }
    })
});