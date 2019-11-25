const CalculatorProvider = require('./calculator.provider.js');

test('returns near 0.958% for a total of 10% over 10 coupon detachments', () => {
    const calc = CalculatorProvider.any();

    calc.order.bond.remainingCoupons = () => 10;
    calc.totalReturn = () => 0.1;
    
    const expected = 0.00958;

    expect(calc.yearlyCompoundedReturn()).toBeCloseTo(expected);
});