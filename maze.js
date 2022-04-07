import {State} from './state.js'

export class Maze {
  constructor(grid_num) {
    this.grid_num = grid_num
    this.start = new State(grid_num)
    for (let i = 0; i < grid_num; i++) {
      for (let j = 0; j < grid_num; j++) {
        this.start.set(i, j, this.start.free)
      }
    }
    this.start.set(0, 0, this.start.busy)
  }

  get_result() {
    let queue = new Array()
    queue.push(this.start)
    let visited = new Set()
    let finish = null
    while (queue.length != 0) {
      let first = queue.shift()
      if (first.success()) {
        finish = first
        break
      } else {
        let nextList = first.next()
        if (nextList == null) {
          continue
        }
        for (let a of nextList) {
          if (!visited.has(a.key())) {
            visited.add(a.key())
            queue.push(a)
          }
        }
      }
    }
    return finish
  }
}