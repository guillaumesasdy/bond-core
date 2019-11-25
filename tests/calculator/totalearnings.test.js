const CalculatorProvider = require('./calculator.provider.js');

test("returns the sum of the order's nominal value, and the remaining interest less tax plus the broker's receipt", () => {
    const calc = CalculatorProvider.any();
    calc.order.nominalValue = () => 2000;
    calc.order.remainingInterest = () => 100;

    calc.expenses.couponTax = 0.1;
    calc.expenses.couponReceipt = 0.1;
    
    const expected = 2080;

    expect(calc.totalEarnings()).toBeCloseTo(expected);
});