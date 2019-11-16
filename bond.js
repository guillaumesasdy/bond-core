class Bond {
    // issuer is a string
    // nominal is a number
    // currency is a string
    // maturity is a date
    // coupon is a percentage
    constructor(issuer, nominal, currency, maturity, coupon) {
        this.issuer = issuer;
        this.nominal = nominal;
        this.currency = currency;
        this.maturity = maturity;
        this.coupon = coupon;
        this.oneDayInMs = 1000 * 60 * 60 * 24;
        this.averageDaysInYear = 365.25;
    }

    fullInterest() {
        return this.nominal * this.coupon;
    }

    // t is a date
    accruedInterest(t) {
        if (this.remainingCoupons(t) === 0)
            return 0;

        const previousDetachmentDate = this.previousDetachmentDate(t);
        const nextDetachmentDate = this.addYearsTo(1, new Date(previousDetachmentDate.getTime()));

        const accruedMs = t.getTime() - previousDetachmentDate.getTime();
        const accruedDays = Math.round(accruedMs / this.oneDayInMs);

        const remainingMs = nextDetachmentDate.getTime() - t.getTime();
        const remainingDays = Math.round(remainingMs / this.oneDayInMs);

        const accruedRatio = accruedDays / (accruedDays + remainingDays);

        return accruedRatio * this.fullInterest();
    }

    // t is a date
    previousDetachmentDate(t) {
        if (t >= this.maturity)
            return this.maturity;

        const maturityMonth = this.maturity.getMonth();
        const maturityDay = this.maturity.getDate();

        const couponDate = new Date(t.getFullYear(), maturityMonth, maturityDay);

        if (t < couponDate) {
            this.addYearsTo(-1, couponDate);
        }

        return couponDate;
    }

    // t is a date
    remainingCoupons(t) {
        const previousDetachmentDate = this.previousDetachmentDate(t);

        const remainingMs = this.maturity.getTime() - previousDetachmentDate.getTime();
        const remainingYears = remainingMs / (this.oneDayInMs * this.averageDaysInYear);

        return Math.round(remainingYears);
    }

    // n is an integer
    // t is a Date
    addYearsTo(n, t) {
        t.setFullYear(t.getFullYear() + n);

        // warn GSA would it be best to return a new object in method addYears?
        return t;
    }
}

module.exports = Bond;