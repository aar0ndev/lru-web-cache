/**
 * Simple LRU Cache implementation.
 */

export class LRUCache {
  constructor () {
    this.__store = {}
    this.__head = null
    this.__tail = null
  }

  /**
   * Returns value stored in cache or undefined if not found. Updates the LRU
   * order for given key if it exists.
   * @param {String} key
   */
  get (key) {
    this._updateUsage(key)
    return this.__store[key] && this.__store[key].val
  }

  /**
   * Returns true if key is in the cache, false otherwise.
   * @param {String} key
   */
  has (key) {
    return key in this.__store
  }

  /**
   * Return key to the least recently used value but do not update the LRU
   * order.
   */
  getLruKey () {
    return this.__head
  }

  /**
   * Add or update value in the cache for given key. Return the old value if one
   * exists otherwise null. Update the LRU order for given key.
   * @param {String} key
   * @param {*} val
   */
  set (key, val) {
    var oldObj = this.__store[key]
    const hasOldVal = !!oldObj
    var newObj = { key, val, prev: null, next: null }
    if (hasOldVal) {
      newObj.prev = oldObj.prev
      newObj.next = oldObj.next
    }
    this.__store[key] = newObj
    // handle case where store was empty
    if (this.__head === null) {
      this.__head = key
    }
    this._updateUsage(key)
    return hasOldVal ? oldObj.val : null
  }

  /**
   * Remove the value from cache and returns the value if cache contained it.
   * Returns null if no cache item removed.
   * @param {String} key
   */
  del (key) {
    if (key === null) throw new Error('invalid key')
    if (!(key in this.__store)) return null
    const { prev, next } = this.__store[key]
    if (this.__head === key) {
      this.__head = this.__store[this.__head].next
    }
    if (this.__tail === key) {
      this.__tail = this.__store[this.__tail].prev
    }
    if (next !== null) {
      this.__store[next].prev = prev
    }
    if (prev !== null) {
      this.__store[prev].next = next
    }
    delete this.__store[key]
  }

  /**
   * Internal method. Updates the LRU order for specified key.
   * @param {String} key
   */
  _updateUsage (key) {
    if (key === null) return
    if (!(key in this.__store)) return
    const oldTail = this.__store[this.__tail] || { key: null }
    const newTail = this.__store[key]
    if (oldTail != newTail) {
      // handle case where head becomes the tail
      if (this.__head === key) {
        this.__head = newTail.next !== null ? newTail.next : key
      }
      this.__tail = key
      oldTail.next = key
      newTail.prev = oldTail.key
    }
  }

  /**
   * Dump cache to string. Useful for persistence.
   * @returns {String}
   */
  dump () {
    return JSON.stringify(this)
  }

  /**
   * Load cache from string representation.
   * @param {String} s from dump()
   */
  load (s) {
    const obj = JSON.parse(s)
    Object.assign(this, obj)
  }
}
