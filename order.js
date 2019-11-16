class Order {
    // bond is a Bond
    // date is a date
    // quantity is an integer
    // price is a percentage
    constructor(bond, date, quantity, price) {
        this.bond = bond;
        this.date = date;
        this.quantity = quantity;
        this.price = price;
    }

    initialValue() {
        let unitaryPrice = this.bond.nominal * this.price;
        
        return unitaryPrice * this.quantity;
    }

    nominalValue() {
        return this.bond.nominal * this.quantity;
    }

    remainingInterest() {
        let unitaryValue = this.bond.fullInterest() * this.bond.remainingCoupons(this.date);

        return unitaryValue * this.quantity;
    }
}

module.exports = Order;