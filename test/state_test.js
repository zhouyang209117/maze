import {State} from '../js/state.js'
import assert from 'assert'

describe('State1', function() {
  describe('set1', function() {
    it('', function() {
      let s = new State(4)
      s.set(0, 0, 1)
      s.set(0, 1, 0)
      s.set(0, 2, 1)
      s.set(1, 0, 0)
      s.set(1, 1, 1)
      s.set(1, 2, 1)
      s.set(2, 0, 0)
      s.set(2, 1, 0)
      s.set(2, 2, 0)
      assert.equal(true, s.get(0, 0) == 1)
      assert.equal(true, s.get(0, 1) == 0)
      assert.equal(true, s.get(0, 2) == 1)
      assert.equal(true, s.get(1, 0) == 0)
      assert.equal(true, s.get(1, 1) == 1)
      assert.equal(true, s.get(1, 2) == 1)
      assert.equal(true, s.get(2, 0) == 0)
      assert.equal(true, s.get(2, 1) == 0)
      assert.equal(true, s.get(2, 2) == 0)
    })
  })
})

describe('State2', function() {
  describe('set2', function() {
    it('', function() {
      let s = new State(2)
      let n00 = 0
      let n01 = 0
      let n10 = 0
      let n11 = 1
      s.set(0, 0, n00)
      s.set(0, 1, n01)
      s.set(1, 0, n10)
      s.set(1, 1, n11)
      assert.equal(true, s.get(0, 0) == n00)
      assert.equal(true, s.get(0, 1) == n01)
      assert.equal(true, s.get(1, 0) == n10)
      assert.equal(true, s.get(1, 1) == n11)

    })
  })
})