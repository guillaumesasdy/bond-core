/** Represent an order, or simply a quantity of a single kind of bonds, purchased at a given price, at a given date. */
class Order {
    /**
     * Create an order.
     * @param {Bond} bond - The given kind of bonds purchased.
     * @param {Date} date - The date the purchased was made.
     * @param {number} quantity - The quantity of bonds, must be an integer.
     * @param {number} price - The price the bonds, expressed as a proper fraction of the face value.
     */
    constructor(bond, date, quantity, price) {
        this.bond = bond;
        this.date = date;
        this.quantity = quantity;
        this.price = price;
    }

    /**
     * Compute the total value of the bonds when they were purchased.
     * @return {number} The initial value of the bonds.
     */
    initialValue() {
        let unitaryPrice = this.bond.nominal * this.price;
        
        return unitaryPrice * this.quantity;
    }

    /**
     * Compute the total face value of the bonds.
     * @return {number} The face value of the bonds.
     */
    nominalValue() {
        return this.bond.nominal * this.quantity;
    }

    /**
     * Compute the remaining interest if the bonds are kept until maturity.
     * @return {number} The remaining interest of the bonds.
     */
    remainingInterest() {
        let unitaryValue = this.bond.fullInterest() * this.bond.remainingCoupons(this.date);

        return unitaryValue * this.quantity;
    }
}

module.exports = Order;