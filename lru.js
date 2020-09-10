/**
 * Simple LRU Cache implementation.
 */

class LRUCache {
  constructor () {
    this._store = {}
    this._head = null
    this._tail = null
  }

  /**
   * Returns value stored in cache or undefined if not found. Updates the LRU
   * order for given key if it exists.
   * @param {*} key
   */
  get (key) {
    this._updateUsage(key)
    return this._store[key] && this._store[key].val
  }

  /**
   * Return key to the least recently used value but do not update the LRU
   * order.
   */
  getLruKey () {
    return this._head
  }

  /**
   * Add or update value in the cache for given key. Return the old value if one
   * exists otherwise null. Update the LRU order for given key.
   * @param {*} key
   * @param {*} val
   */
  set (key, val) {
    var oldObj = this._store[key]
    const hasOldVal = !!oldObj
    var newObj = { key, val, prev: null, next: null }
    if (hasOldVal) {
      newObj.prev = oldObj.prev
      newObj.next = oldObj.next
    }
    this._store[key] = newObj
    // handle case where store was empty
    if (this._head === null) {
      this._head = key
    }
    this._updateUsage(key)
    return hasOldVal ? oldObj.val : null
  }

  /**
   * Delete the value from cache.
   * @param {*} key
   */
  del (key) {
    if (key === null) throw new Error('invalid key')
    const { prev, next } = this._store[key]
    if (this._head === key) {
      this._head = this._store[this._head].next
    }
    if (this._tail === key) {
      this._tail = this._store[this._tail].prev
    }
    if (next !== null) {
      this._store[next].prev = prev
    }
    if (prev !== null) {
      this._store[prev].next = next
    }
    delete this._store[key]
  }

  /**
   * Internal method. Updates the LRU order for specified key.
   * @param {*} key
   */
  _updateUsage (key) {
    if (key === null) return
    if (!(key in this._store)) return
    const oldTail = this._store[this._tail] || { key: null }
    const newTail = this._store[key]
    // handle case where head becomes the tail
    if (this._head === key) {
      this._head = newTail.next !== null ? newTail.next : key
    }
    this._tail = key
    oldTail.next = key
    newTail.prev = oldTail.key
  }

  /**
   * Dump cache to string. Useful for persistence.
   */
  dump () {
    return JSON.stringify(this)
  }

  /**
   * Load cache from string representation.
   * @param {string} s from dump()
   */
  load (s) {
    const obj = JSON.parse(s)
    Object.assign(this, obj)
  }
}

module.exports = LRUCache
