const BondProvider = require('./bond.provider.js');

const createBond = function() {
    const bond = BondProvider.any();
    bond.maturity = new Date(2024, 10, 15);

    return bond;
}

test('returns the previous coupon detachment date for date in between two detachments', () => {
    const bond = createBond();

    const dateInBetween = new Date(2023, 0, 1);
    const previousCouponDate = new Date(2022, 10, 15);

    expect(bond.previousDetachmentDate(dateInBetween)).toEqual(previousCouponDate);
});

test('returns the same date for a coupon detachment date in the past', () => {
    const bond = createBond();

    const aCouponDate = new Date(2021, 10, 15);

    expect(bond.previousDetachmentDate(aCouponDate)).toEqual(aCouponDate);
});

test('returns the bond maturity date for a date 3 years later', () => {
    const bond = createBond();

    const afterThreeYears = new Date(2027, 10, 20);
    const bondMaturity = new Date(bond.maturity.getTime());

    expect(bond.previousDetachmentDate(afterThreeYears)).toEqual(bondMaturity);
});