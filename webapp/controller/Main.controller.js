sap.ui.define([
    'sap/ui/core/mvc/Controller',
], function (Controller) {
    'use strict';

    return Controller.extend("ProjBrowseOrders.browseorders.controller.Main", {
        onInit: function () {
            const service = "/Northwind/V2/(S(ktypfzlwprqyezyjst0nncbc))/OData/OData.svc/"
            const person = {
                headers: { "Content-ID": "0" }
            }
            this.odata = new sap.ui.model.odata.v2.ODataModel(service, person)

            this.odata.read("/Products", {
                success: function (response) {
                    console.log(response.results)

                    const model = new sap.ui.model.json.JSONModel(response.results)
                    this.getView().setModel(model, "myModel")
                }.bind(this),

                error: function (error) {
                    console.error("Erro requisição" + error)
                }
            })
        }
    })
});