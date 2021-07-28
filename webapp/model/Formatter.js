sap.ui.define([], function () {
    'use strict';
    return {
        dateFormatMonths: function (date) {
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
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
        },
        shippedText: function (requiredDate, shippedDate, shippedOrder) {

            const betweenDays = requiredDate - shippedDate
            const difference = betweenDays / 1000 / 60 / 60 / 24

            // console.log(`A ordem ${shippedOrder} foi entregue com ${difference} dias de antecendencia`)

            if (difference < 0) {
                return "Too Late"
            } else if (difference >= 0 && difference < 20) {
                return "Urgent"
            } else {
                return "In Time"
            }

        },
        shippedState: function (requiredDate, shippedDate) {

            const betweenDays = requiredDate - shippedDate
            const difference = betweenDays / 1000 / 60 / 60 / 24

            // console.log(`A ordem ${shippedOrder} foi entregue com ${difference} dias de antecendencia`)

            if (difference < 0) {
                return "Error"
            } else if (difference >= 0 && difference < 20) {
                return "Warning"
            } else {
                return "Success"
            }
        }
    }
});