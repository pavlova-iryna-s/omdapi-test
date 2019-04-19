/**
 * @param {HTMLElement} target
 * @param {String} event
 * @param {Function} handler
 */
const $on = (target, event, handler) => {
    return target.addEventListener(event, handler);
};

/**
 * @param literal
 * @param cooked
 * @return {String}
 */
const $html = (literal, ...cooked) => {
    let result = '';

    cooked.forEach((cook, i) => {
        let lit = literal[i];

        if (Array.isArray(cook)) {
            cook = cook.join('');
        }

        result += lit;
        result += cook;
    });

    result += literal[literal.length - 1];

    return result;
};

/**
 * @param {*} condition
 * @param {String} message
 */
const $assert = (condition, message) => {
    if (condition) {
        return;
    }

    message = message || 'Assertion failed';

    if (typeof Error !== 'undefined') {
        throw new Error(message);
    }

    throw message;
};

export { $on, $html, $assert };
