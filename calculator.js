/** Compute cost, earnings and return of an order, given expenses such as taxes and fees. */
class Calculator {
    /**
     * Create a calculator.
     * @param {Order} order - The order.
     * @param {Expenses} expenses - The expenses.
     */
    constructor(order, expenses) {
        this.order = order;
        this.expenses = expenses;
    }

    /**
     * Compute the cost of purchasing the order.
     * It takes into account the broker's subscription fees, the order's current price, and the accrued interests.
     * @return {number} The cost of purchasing the order.
     */
    purchaseCost() {
        let order = this.order.initialValue() * (1 + this.expenses.orderSubscription);

        let purchasedOn = this.order.date;

        let accruedInterest = this.order.bond.accruedInterest(purchasedOn);

        return order
            + accruedInterest;
    }

    /**
     * Compute the total earnings of the order, if kept until maturity.
     * It takes into account the remaining coupon payments less taxes and fees, the sum of the bonds, less the purchasing price.
     * @return {number} The total earnings.
     */
    totalEarnings() {
        let coupons = this.order.remainingInterest() * (1 - this.expenses.couponReceipt - this.expenses.couponTax);

        return this.order.nominalValue()
            - this.purchaseCost()
            + coupons;
    }

    /**
     * Compute the total return of the order, if kept until maturity.
     * @return {number} The ratio between the earnings and the purchasing cost.
     */
    totalReturn() {
        return this.totalEarnings() / this.purchaseCost();
    }

    /**
     * Compute the yearly compounded return of the order, if kept until maturity.
     * @return {number} The yearly compounded return.
     */
    yearlyCompoundedReturn() {
        let compoundFactor = 1 / this.order.bond.remainingCoupons(this.order.date);

        let compoundedGrowth = Math.pow(1 + this.totalReturn(), compoundFactor) - 1;

        return compoundedGrowth;
    }
}

module.exports = Calculator;