const CalculatorProvider = require('./calculator.provider.js');

test('returns the ratio between all the earnings and the initial cost', () => {
    const calc = CalculatorProvider.any();

    // cost is 1900 + 190 + 10 = 2100
    calc.order.initialValue = () => 1900;
    calc.expenses.orderSubscription = 0.1;
    calc.order.bond.accruedInterest = () => 10;

    // earnings is 2000 + 160 - 2100 = 60
    calc.order.nominalValue = () => 2000;
    calc.order.remainingInterest = () => 200;
    calc.expenses.couponTax = 0.1;
    calc.expenses.couponReceipt = 0.1;
    
    const expected = 0.02857142857;
    const decimals = 10;

    expect(calc.totalReturn()).toBeCloseTo(expected, decimals);
});