const BondProvider = require('../bond/bond.provider.js');
const Order = require('../../order.js');

class OrderProvider {
    static any() {
        const anyBond = BondProvider.any();
        const anyDate = new Date();
        const anyQuantity = 0;
        const anyPrice = 0;

        return new Order(anyBond, anyDate, anyQuantity, anyPrice);
    }
}

module.exports = OrderProvider;