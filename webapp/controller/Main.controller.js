sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/odata/v2/ODataModel',
    'sap/ui/model/json/JSONModel'
], function (Controller, ODataModel, JSONModel) {
    'use strict';

    return Controller.extend("ProjBrowseOrders.browseorders.controller.Main", {
        onInit: function () {
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
                    this.getView().setModel(model, "myModel")
                }.bind(this),

                error: function (error) {
                    console.error("Erro requisição" + error)
                }
            })
        }
    })
});