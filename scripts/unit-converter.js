// TODO: Consider conversion to base unit and let the UI convert to the closest unit.
class UnitConverter {
    convertQuantity(input) {
        const matches = input.match(/([0-9]+)|([a-zA-Z]+)/gi);
        const amount = matches[0];
        const unit = matches[1];

        switch (unit) {
            /* Mass(m) */
            case 'mg':
            case 'g':
            case 'kg':
            /* Mass(i) */
            case 'oz':
            case 'lb':
            /* Length(m) */
            case 'mm':
            case 'cm':
            case 'm':
            /* Length(i) */
            case 'in':
            case 'ft':
            case 'yd':
            /* Volume(m) */
            case 'ml':
            case 'cl':
            case 'l':
            /* Volume(i) */
            case 'fl-oz':
            case 'pt':
            case 'qt':
            case 'gal':
                return this.__conversionResult(amount, unit, amount, unit);
        }
    }
    
    convertTemperature(input) {
        const matches = input.match(/([0-9]+)|([a-zA-Z]+)/gi);
        const amount = parseFloat(matches[0]);
        const unit = matches[1];
    
        switch (unit) {
            case 'c':
                return this.__conversionResult(amount, 'c', amount * 1.8 + 32, 'f');
            case 'f':
                return this.__conversionResult((amount - 32) / 1.8, 'c', amount, 'f');
        }
    
        return input;
    }

    __conversionResult(mValue, mUnit, iValue, iUnit){
        return { mValue: mValue, mUnit: mUnit, iValue: iValue, iUnit: iUnit };
    }
}

const unitConverter = new UnitConverter();