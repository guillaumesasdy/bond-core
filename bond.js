/** Represent a bond. */
class Bond {
    /**
     * Create a point.
     * @param {string} issuer - The issuer.
     * @param {number} nominal - The nominal value, also called face value.
     * @param {string} currency - The currency.
     * @param {Date} maturity - The maturity.
     * @param {number} coupon - The bond rate must be a proper fraction.
     */
    constructor(issuer, nominal, currency, maturity, coupon) {
        this.issuer = issuer;
        this.nominal = nominal;
        this.currency = currency;
        this.maturity = maturity;
        this.coupon = coupon;
        this.oneDayInMs = 1000 * 60 * 60 * 24;
        this.averageDaysInYear = 365.25;
    }

    /**
     * Compute the full interest of one coupon payment.
     * @return {number} The value of a coupon.
     */
    fullInterest() {
        return this.nominal * this.coupon;
    }

    /**
     * Compute the accrued interest of one coupon payment for a given date.
     * @param {Date} t - The date used to compute the accrued number of days since the previous coupon detachement.
     * @return {number} The accrued interest.
     */
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

    /**
     * Compute the previous detachment date for a given date.
     * @param {Date} t - The date used to compute the accrued number of days since the previous coupon detachement.
     * @return {Date} The previous detachment date.
     */
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

    /**
     * Compute the remaining number of coupon detachments for a given date.
     * @param {*} t - The date used to compute the remaining number of coupon detachments until the bond maturity.
     * @return {number} The remaining number of coupon detachments as an integer.
     */
    remainingCoupons(t) {
        const previousDetachmentDate = this.previousDetachmentDate(t);

        const remainingMs = this.maturity.getTime() - previousDetachmentDate.getTime();
        const remainingYears = remainingMs / (this.oneDayInMs * this.averageDaysInYear);

        return Math.round(remainingYears);
    }

    /**
     * Add years to the given date.
     * @param {*} n - The number of years to add.
     * @param {*} t - The date to modify.
     * @return {Date} The given date passed in parameter.
     */
    addYearsTo(n, t) {
        t.setFullYear(t.getFullYear() + n);

        // warn GSA would it be best to return a new object in method addYears?
        return t;
    }
}

module.exports = Bond;