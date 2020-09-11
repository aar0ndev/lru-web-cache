/* global expect, test */

import { LRUCache } from '../src/lru.js'

test('LRUCache init', () => {
  expect(new LRUCache()).toBeDefined()
})

test('LRUCache set returns null', () => {
  const c = new LRUCache()
  expect(c.set(0, 0)).toBe(null)
})

test('LRUCache has returns false', () => {
  const c = new LRUCache()
  expect(c.has(0)).toBe(false)
})

test('LRUCache set/has returns true', () => {
  const c = new LRUCache()
  c.set(0, 0)
  expect(c.has(0)).toBe(true)
})

test('LRUCache set/set returns old value', () => {
  const c = new LRUCache()
  c.set(0, 0)
  expect(c.has(0)).toBe(true)
  expect(c.set(0, 1)).toBe(0)
})

test('LRUCache set/get returns value', () => {
  const c = new LRUCache()
  c.set(0, 'a')
  c.set(1, 'b')
  expect(c.get(0)).toBe('a')
  expect(c.get(1)).toBe('b')
})

test('LRUCache set/del/get returns undefined', () => {
  const c = new LRUCache()
  c.set('0', '0')
  c.del('0')
  expect(c.get('0')).toBeUndefined()
})

test('LRUCache del returns null', () => {
  const c = new LRUCache()
  expect(c.del('0')).toBeNull()
})

test('LRUCache set/get/del/getLruKey returns null', () => {
  const c = new LRUCache()
  c.set('0', '0')
  debugger
  c.get('0')
  c.del('0')
  expect(c.getLruKey()).toBeNull()

  c.set('1', '0')
  c.get('1')
  c.del('1')
  expect(c.getLruKey()).toBeNull()
})

test('LRUCache get updates LRU order', () => {
  const c = new LRUCache()
  c.set(0, 'a')
  c.set(1, 'b')
  c.get(0)
  expect(c.getLruKey()).toBe(1)
})

test('LRUCache set updates LRU order', () => {
  const c = new LRUCache()
  c.set(0, 'a')
  c.set(1, 'b')
  c.set(0, 'c')
  expect(c.getLruKey()).toBe(1)
})

test('LRUCache del updates LRU order', () => {
  const c = new LRUCache()
  c.set(0, 'a')
  c.set(1, 'b')
  c.del(0)
  expect(c.getLruKey()).toBe(1)
})

test('LRUCache set/del/set/get returns value', () => {
  const c = new LRUCache()
  c.set(0, 'a')
  c.del(0)
  c.set(1, 'b')
  expect(c.get(0)).toBeUndefined()
  expect(c.get(1)).toBe('b')
})

test('LRUCache set/dump/load/get returns value', () => {
  const c = new LRUCache()
  c.set(0, 'a')
  const s = c.dump()
  c.load(s)
  expect(c.get(0)).toBe('a')
})
