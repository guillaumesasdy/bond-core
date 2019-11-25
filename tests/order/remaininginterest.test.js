const OrderProvider = require('./order.provider.js');

const createOrder = function() {
    const order = OrderProvider.any();
    order.quantity = 2;
    order.price = 0.9;

    return order;
}

test('returns 40 for an order of 2 quantity, with each 2 remaining coupon detachements that each worth 10', () => {
    const order = createOrder();
    order.bond.fullInterest = () => 10;
    order.bond.remainingCoupons = () => 2;
    
    const expected = 40;

    expect(order.remainingInterest()).toBeCloseTo(expected);
});

test('returns 0 when no coupon detachment are left', () => {
    const order = createOrder();
    order.bond.fullInterest = () => 10;
    order.bond.remainingCoupons = () => 0;

    const expected = 0;

    expect(order.remainingInterest()).toBeCloseTo(expected);
});