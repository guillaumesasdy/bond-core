const BondProvider = require('./bond.provider.js');

test('adds 1 year to the Date object passed as parameter', () => {
    const parameter = new Date(2019, 1, 1);

    BondProvider.any().addYearsTo(1, parameter);

    const expected = new Date(2020, 1, 1);

    expect(parameter).toEqual(expected);
});

test('returns the Date object passed as parameter',  () => {
    const parameter = new Date(2019, 1, 1);

    const returned = BondProvider.any().addYearsTo(1, parameter);

    expect(returned).toBe(parameter);
});