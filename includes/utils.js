function hash(expression) {
    return `farm_fingerprint(${expression})`;
}

module.exports = {
    hash
};