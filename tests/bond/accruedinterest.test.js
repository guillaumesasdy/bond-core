const BondProvider = require('./bond.provider.js');

const createBond = function() {
    const bond = BondProvider.any();
    bond.maturity = new Date(2024, 0, 1);
    bond.nominal = 1000;
    bond.coupon = 0.1;

    return bond;
}

test('returns a decimal close to 2.73224043716 for 10 days after the previous detachment date in a leap year', () => {
    const bond = createBond();

    const leapYear = 2020;
    const tenDaysAfter = new Date(leapYear, 0, 11);

    // expected: 100 for the full interest * (10 days / 366 days in a leap year)
    const expected = 2.73224043715;
    const decimals = 9;

    expect(bond.accruedInterest(tenDaysAfter)).toBeCloseTo(expected, decimals);
});

test('returns a decimal close to 2.2.7397260274 for 10 days after the previous detachment date in a leap year', () => {
    const bond = createBond();

    const regularYear = 2021;
    const tenDaysAfter = new Date(regularYear, 0, 11);

    // expected: 100 for the full interest * (10 days / 365 days in a regular year)
    const expected = 2.7397260273;
    const decimals = 9;

    expect(bond.accruedInterest(tenDaysAfter)).toBeCloseTo(expected, decimals);
});

test('returns 0 for a coupon detachment date', () => {
    const bond = createBond();

    const detachmentDate = new Date(2022, 0, 1);

    expect(bond.accruedInterest(detachmentDate)).toBe(0);
});

test('returns 0 for a date after bond maturity', () => {
    const bond = createBond();

    const tenDaysAfter = new Date(2024, 0, 10);

    expect(bond.accruedInterest(tenDaysAfter)).toBe(0);
});