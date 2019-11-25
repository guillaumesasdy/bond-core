const BondProvider = require('./bond.provider.js');

test('returns 42.2 for a bond worth 2,000 with a coupon 2.11%', () => {
    const bond = BondProvider.any();
    bond.nominal = 2000;
    bond.coupon = 0.0211;

    expect(bond.fullInterest()).toBe(42.2);
});