const CalculatorProvider = require('./calculator.provider.js');

test("returns the sum of the order's initial value with 10% of subscription fees, plus the accrued interest", () => {
    const calc = CalculatorProvider.any();
    calc.order.initialValue = () => 2000;
    calc.expenses.orderSubscription = 0.1;
    calc.order.bond.accruedInterest = () => 500;
    
    const expected = 2700;

    expect(calc.purchaseCost()).toBeCloseTo(expected);
});