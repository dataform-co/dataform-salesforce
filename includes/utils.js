function hash(s) {
    // simple hash function used to obfuscate strings
    
    for(var i = 0, h = 0xdeadbeef; i < s.length; i++)
        h = Math.imul(h ^ s.charCodeAt(i), 2654435761);
    return (h ^ h >>> 16) >>> 0;
}

module.exports = {
    hash
};