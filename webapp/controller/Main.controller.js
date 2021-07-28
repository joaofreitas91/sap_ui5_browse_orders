sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/odata/v2/ODataModel',
    'sap/ui/model/json/JSONModel',
    '../model/Formatter'

], function (Controller, ODataModel, JSONModel, Formatter) {
    'use strict';

    return Controller.extend("ProjBrowseOrders.browseorders.controller.Main", {
        Formatter: Formatter,
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
                    // console.log(response.results[0])

                    const model = new JSONModel(response.results)
                    this.getView().setModel(model, "modelOrders")
                }.bind(this),

                error: function (error) {
                    console.error("Erro requisição" + error)
                }
            })
        }
    })
});