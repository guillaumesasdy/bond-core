const BondProvider = require('./bond.provider.js');

const createBond = function() {
    const bond = BondProvider.any();
    bond.maturity = new Date(2015, 0, 1);

    return bond;
}

test('returns 2 for exactly 2 years before the bond maturity date', () => {
    const bond = createBond();

    const twoYearsBefore = new Date(2013, 0, 1);

    expect(bond.remainingCoupons(twoYearsBefore)).toEqual(2);
});

test("returns 1 for one day before the bond maturity date", () => {
    const bond = createBond();

    const oneDayBefore = new Date(2014, 11, 31);

    expect(bond.remainingCoupons(oneDayBefore)).toEqual(1);
});

test("returns 1 for the last coupon detachment date before maturity", () => {
    const bond = createBond();

    const oneDayAfter = new Date(2014, 0, 1);

    expect(bond.remainingCoupons(oneDayAfter)).toEqual(1);
});

test("returns 0 for the bond maturity date", () => {
    const bond = createBond();

    const bondMaturity = new Date(bond.maturity.getTime());

    expect(bond.remainingCoupons(bondMaturity)).toEqual(0);
});

test("returns 0 for two years after bond maturity date", () => {
    const bond = createBond();

    const twoYearsAfter = new Date(2017, 0, 1);

    expect(bond.remainingCoupons(twoYearsAfter)).toEqual(0);
});