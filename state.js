export class State {
  constructor(grid_num) {
    this.grid_num = grid_num
    this.buf = new Uint8Array(new ArrayBuffer(Math.ceil(grid_num * grid_num / 8)))
    this.free = 0
    this.busy = 1
    this.x = null
    this.y = null
    this.pre = null
  }

  _deep_copy() {
    let s = new State(this.grid_num)
    for (let i = 0; i < this.buf[i].length; i++) {
      s.buf.fill(this.buf[i], i, i + 1)
    }
    return s
  }

  get(x, y) {
    let offset = y * this.grid_num + x
    let byte_index = parseInt(offset / 8)
    let byte_offset = offset % 8
    let current = this.buf[byte_index]
    return ((1 << (8 - byte_offset) - 1) & current) >> (7 - byte_offset)
  }

  set(x, y, v) {
    let offset = y * this.grid_num + x
    let byte_index = parseInt(offset / 8)
    let byte_offset = offset % 8
    let current = this.buf[byte_index]
    let low = ((1 << (7 - byte_offset)) - 1) & current
    let mid = v << (7 - byte_offset)
    let high = ((255 >> (8 - byte_offset)) << (8 - byte_offset)) & current
    let new_v = high | mid | low
    this.buf.fill(new_v, byte_index, byte_index + 1)
  }

  next() {
    let result = new Array()
    for (let i = 0; i < this.grid_num; i++) {
      for (let j = 0; j < this.grid_num; j++) {
        if (this.get(i, j) == this.busy) {
          if (j - 1 >= 0 && this.get(i, j - 1) == this.free) {
            let new_s = this._deep_copy()
            new_s.x = i
            new_s.y = j - 1
            new_s.set(new_s.x, new_s.y, this.busy)
            result.push(new_s)
          }
          if (i + 1 <= this.grid_num - 1 && this.get(i + 1, j) == this.free) {
            let new_s = this._deep_copy()
            new_s.x = i + 1
            new_s.y = j
            new_s.set(new_s.x, new_s.y, this.busy)
            result.push(new_s)
          }
          if (j + 1 <= this.grid_num - 1 && this.get(i, j + 1) == this.free) {
            let new_s = this._deep_copy()
            new_s.x = i
            new_s.y = j + 1
            new_s.set(new_s.x, new_s.y, this.busy)
            result.push(new_s)
          }
          if (i - 1 >= 0 && this.get(i - 1, j) == this.free) {
            let new_s = this._deep_copy()
            new_s.x = i - 1
            new_s.y = j
            new_s.set(new_s.x, new_s.y, this.busy)
            result.push(new_s)
          }
        }
      }
    }
    return result
  }

  success() {
    return this.get(this.grid_num - 1, this.grid_num - 1) == this.busy
  }

  key() {
    return this.buf.toString()
  }

  toString() {
    let s = ""
    for (let i = 0; i < this.grid_num; i++) {
      for (let j = 0; j < this.grid_num; j++) {
        s += (this.get(i , j) + ",")
      }
      s += "\n"
    }
    return s
  }
}