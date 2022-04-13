import {State} from './state.js'
import {Result} from './result.js'
import {Grid} from './pos.js'
import {Wall} from './pos.js'

export class Maze {
  constructor(grid_num) {
    this.grid_num = grid_num
    this.start = new State(grid_num)
    for (let i = 0; i < grid_num; i++) {
      for (let j = 0; j < grid_num; j++) {
        this.start.set(i, j, this.start.free)
      }
    }
    this.H = 0
    this.V = 1
  }

  _get_wall_pos(old, current) {
    let wall = null
    if (old.x == current.x && old.y > current.y) {
      wall =  new Wall(old.x, old.y, this.H)
    } else if (old.x < current.x && old.y == current.y) {
      wall = new Wall(old.x + 1, old.y, this.V)
    } else if (old.x == current.x && old.y < current.y) {
      wall = new Wall(old.x, old.y + 1, this.H)
    } else {
      wall = new Wall(old.x, old.y, this.V)
    }
    return wall.x + "_" + wall.y + "_" + wall.d
  }

  _dfs(s, grid, wall_removed) {
    s.set(grid.x, grid.y, s.busy)
    if (grid.x == this.grid_num - 1 && grid.y == this.grid_num - 1) {
      return new Result(s, true)
    }
    let next_list = s.next(grid)
    for (let tmp_grid of next_list) {
      if (s.get(tmp_grid.x, tmp_grid.y) == s.free) {
        wall_removed.push(this._get_wall_pos(grid, tmp_grid))
        let result = this._dfs(s, tmp_grid, wall_removed)
        if (result.finish) {
          return result
        }
      }
    }
    return new Result(null, false)
  }

  create() {
    let wall_removed = new Array()
    let s = this._dfs(this.start, new Grid(0, 0), wall_removed)
    return {state: s, wall_removed: wall_removed}
  }
}