class Expenses {
    // orderSubscription is a percentage
    // couponReceipt is a percentage
    // couponTax is a percentage
    constructor(orderSubscription, couponReceipt, couponTax) {
        this.orderSubscription = orderSubscription;
        this.couponReceipt = couponReceipt;
        this.couponTax = couponTax;
        // warn GSA should the tax be applied if the buying price < 100% ?
    }
}

module.exports = Expenses;