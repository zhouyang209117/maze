import {State} from './state.js'
import {Result} from './result.js'
import {Pos} from './pos.js'

export class Maze {
  constructor(grid_num) {
    this.grid_num = grid_num
    this.start = new State(grid_num)
    for (let i = 0; i < grid_num; i++) {
      for (let j = 0; j < grid_num; j++) {
        this.start.set(i, j, this.start.free)
      }
    }
  }

  _dfs(s, pos) {

    // if (s.success()) {
    //   return new Result(s, true)
    // }
    s.set(pos.x, pos.y, s.busy)
    if (pos.x == this.grid_num - 1 && pos.y == this.grid_num - 1) {
      console.log(s)
      console.log(s.toString())
      return new Result(s, true)
    }
    let next_list = s.next(pos)
    for (let tmp_pos of next_list) {
      if (s.get(tmp_pos.x, tmp_pos.y) == s.free) {
        let result = this._dfs(s, tmp_pos)
        if (result.finish) {
          return result
        }
      }
    }
    return new Result(null, false)
  }

  create() {
    return this._dfs(this.start, new Pos(0, 0))
  }
}