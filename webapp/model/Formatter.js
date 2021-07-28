sap.ui.define([], function () {
    'use strict';
    return {
        dateFormatMonths: function (date) {
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            var dateFormatated = (date.getFullYear() + "/" + ((date.getMonth() + 1)) + "/" + (date.getDate()));
            var dateFormatated = (`${date.getDate()} de ${months[(date.getMonth())]} de ${(date.getFullYear())} `);
            return dateFormatated
        },
        dateFormatNumbers: function (date) {
            function addZero(number) {
                if (number <= 9)
                    return "0" + number
                else
                    return number

            }
            var dateFormatated = (addZero(date.getDate()) + "/" + addZero(((date.getMonth() + 1))) + "/" + (date.getFullYear()));
            return dateFormatated
        }
    }
});