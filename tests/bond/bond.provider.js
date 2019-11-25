const Bond = require('../../bond.js');

class BondProvider {
    static any() {
        const anyMaturity = new Date();
        const anyNominal = 0;
        const anyCoupon = 0;
        const anyIssuer = "";
        const anyCurrency = "";

        return new Bond(anyIssuer, anyNominal, anyCurrency, anyMaturity, anyCoupon);
    }
}

module.exports = BondProvider;