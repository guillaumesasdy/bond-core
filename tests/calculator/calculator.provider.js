const Calculator = require('../../calculator.js');
const Expenses = require('../../expenses.js');
const OrderProvider = require('../order/order.provider.js')

class CalcultorProvider {
    static any() {
        const order = OrderProvider.any();

        const anyOrderSubscription = 0;
        const anyCouponReceipt = 0;
        const anyCouponTax = 0;
        const expenses = new Expenses(anyOrderSubscription, anyCouponReceipt, anyCouponTax);

        return new Calculator(order, expenses);
    }
}

module.exports = CalcultorProvider;