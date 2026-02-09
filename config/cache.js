// Import node-cache for caching api responses
const NodeCache = require('node-cache');

// cache instance with a 60-second TTL
const myCache = new NodeCache({
    stdTTL:60 // Cache expires after 60 seconds
})

module.exports = myCache