const OrderProvider = require('./order.provider.js');

test('returns 2000 for an order of 2 quantity priced to 90% the face value of 1,000', () => {
    const order = OrderProvider.any();
    order.bond.nominal = 1000;
    order.quantity = 2;
    order.price = 0.9;

    const expected = 2000;

    expect(order.nominalValue()).toBeCloseTo(expected);
});