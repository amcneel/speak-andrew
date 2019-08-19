
class Cache {
  // 30 days cause I probably won't be making frequent enough updates to where improving the voice would matter
  constructor(daysToLive = 30) {
    this.cacheSize = 50
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
    this.removeOldestFromCache = this.removeOldestFromCache.bind(this)
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
  addToCache(obj, refresh) {
    var created_at = obj.created_at
    var text = obj.text
    var url = obj.url

    // add to cache
    this.cache[text] = {
      'created_at': created_at,
      'url': url
    }

    if (this.getCacheSize() > this.cacheSize && !refresh) {
      // remove that shit from the cache
      this.removeOldestFromCache()
    }
  }
  removeOldestFromCache() {
    console.log("removing oldest!")
    // sort current cache by 'created_at' property
    var keys = Object.keys(this.cache)    
    var cacheObjs = []
    for (let i=0; i<keys.length; i++) {
      let temp = {'text': keys[i]}
      cacheObjs.push({...this.cache[keys[i]], ...temp})
    }

    cacheObjs.sort((a, b) => { (a.created_at > b.created_at) ? 1 : -1 })

    this.cache = cacheObjs.slice(1)

    console.log('updated cache: ', this.cache)
    
  }
  resetCache() {
    this.fetchDate = new Date(0)
  }
}

module.exports = Cache
