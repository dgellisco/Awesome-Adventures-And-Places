// INPUT VALIDATION LOGIC

const validate = (val, rules, connectedValue) => {
    let isValid = true;

    for (let rule in rules) {
        switch (rule) {
            case 'isEmail':
                isValid = isValid && emailValidator(val);
                break;
            case 'minLength':
                isValid = isValid && minLengthValidator(val, rules[rule]);
                break;
            case 'equalTo':
                isValid = isValid && equalToValidator(val, connectedValue[rule]);
                break;
            case 'notEmpty':
                isValid = isValid && notEmptyValidator(val);
                break;
            default:
                isValid = true;
        }
    }

    return isValid;
}

const emailValidator = val => {
    // Test returns true or false for this regex expression
    return /[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/.test(
        val
    );
};

const minLengthValidator = (val, minLength) => {
    return val.length >= minLength
}

const equalToValidator = (val, checkValue) => {
    return val === checkValue
}

const notEmptyValidator = val => {
    return val.trim() !== '';
}

export default validate;