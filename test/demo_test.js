import assert from 'assert'

describe('Uint8Array', function() {
  describe('Uint8Array', function() {
    it('', function() {
      let a = new Uint8Array(new ArrayBuffer(10))
      for (let i = 0; i < 10; i++) {
        a.fill(i, i, i + 1)
      }
      console.log(a)
      let b = new Uint8Array(new ArrayBuffer(10))
      for (let i = 0; i < 10; i++) {
        b.fill(a[i], i, i + 1)
      }
      b.fill(100, 0, 1)
      console.log(b)
      console.log(b.length)
    })
  })
})