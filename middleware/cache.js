
class Cache {
  // 30 days cause I probably won't be making frequent enough updates to where improving the voice would matter
  constructor(daysToLive = 30) {
    this.daysToLive = daysToLive
    this.minutesToLive = daysToLive * 24 * 60
    this.millisecondsToLive = this.minutesToLive * 60 * 1000
    this.cache = {}
    this.fetchDate = new Date(0)
    // action bindings
    this.getFromCache = this.getFromCache.bind(this)
    this.isCacheExpired = this.isCacheExpired.bind(this)
    this.getCacheSize = this.getCacheSize.bind(this)
    this.addToCache = this.addToCache.bind(this)
    this.removeOldestFromCache = this.addToCache.bind(this)
    this.resetCache = this.resetCache.bind(this)
  }
  isCacheExpired() {
    return (this.fetchDate.getTime() + this.millisecondsToLive) < new Date().getTime()
  }
  getCacheSize() {
    return Object.keys(this.cache).length
  }
  /**
   * Returns object if found
   * Returns null if not in cache
   */
  getFromCache(requestedText) {
    if (this.getCacheSize() === 0) {
      return null
    } else {
      if (this.cache[requestedText] != null) {
        return this.cache[requestedText]
      }
      return null
    }
  }
  /**
   * @param {*} obj
   * { created_at: 'YYYY-MM-DDTIME, text: string, url: string }
   */
  addToCache(obj) {
    var created_at = obj.created_at
    var text = obj.text
    var url = obj.url

    if (this.getCacheSize() >= 10) {
      // remove that shit from the cache
      this.removeOldestFromCache()
    }
    // add to cache
    this.cache[text] = {
      'created_at': created_at,
      'url': url
    }
    console.log("added to cache. Current cache:", this.cache)
  }
  removeOldestFromCache() {
    // TODO
  }
  resetCache() {
   this.fetchDate = new Date(0)
  }
}

module.exports = Cache
