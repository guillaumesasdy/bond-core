/** Declare various expenses such as taxes and fees. */
class Expenses {
    /**
     * Create expenses.
     * @param {number} orderSubscription - The fee taken by the broker for an order, must be a proper fraction.
     * @param {number} couponReceipt - The fee taken by the broker on coupon payments, must be a proper fraction.
     * @param {number} couponTax - The taxes taken by the state on coupon payments, must be a proper fraction.
     */
    constructor(orderSubscription, couponReceipt, couponTax) {
        this.orderSubscription = orderSubscription;
        this.couponReceipt = couponReceipt;
        this.couponTax = couponTax;
        // warn GSA should the tax be applied if the buying price < 100% ?
    }
}

module.exports = Expenses;