class UnitConverter {
    convert(input) {
        const regex = /([0-9]+)|([a-zA-Z]+)/g
        const matches = input.match(regex);
        const quantity = matches[0];
        const unit = matches[1];
    
        if (unit === 'c')
            return quantity * 1.8 + 32 + 'f';
    
        return input;
    }    
}

const unitConverter = new UnitConverter();