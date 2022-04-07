import {Pos} from './pos.js'

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

  _shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  next(pos) {
    let result = new Array()
    if (pos.y - 1 >= 0) {
      result.push(new Pos(pos.x, pos.y - 1))
    }
    if (pos.x + 1 <= this.grid_num - 1) {
      result.push(new Pos(pos.x + 1, pos.y))
    }
    if (pos.y + 1 <= this.grid_num - 1) {
      result.push(new Pos(pos.x, pos.y + 1))
    }
    if (pos.x - 1 >= 0) {
      result.push(new Pos(pos.x - 1, pos.y))
    }
    this._shuffle(result)
    return result
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