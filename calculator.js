class Calculator {
    // order is a Order
    // expenses is a Expenses
    constructor(order, expenses) {
        this.order = order;
        this.expenses = expenses;
    }

    purchaseCost() {
        let order = this.order.initialValue() * (1 + this.expenses.orderSubscription);

        let purchasedOn = this.order.date;

        let accruedInterest = this.order.bond.accruedInterest(purchasedOn);

        return order
            + accruedInterest;
    }

    totalEarnings() {
        let coupons = this.order.remainingInterest() * (1 - this.expenses.couponReceipt - this.expenses.couponTax);

        return this.order.nominalValue()
            - this.purchaseCost()
            + coupons;
    }

    totalReturn() {
        return this.totalEarnings() / this.purchaseCost();
    }

    yearlyCompoundedReturn() {
        let compoundFactor = 1 / this.order.bond.remainingCoupons(this.order.date);

        let compoundedGrowth = Math.pow(1 + this.totalReturn(), compoundFactor) - 1;

        return compoundedGrowth;
    }
}

module.exports = Calculator;