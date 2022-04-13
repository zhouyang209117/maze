import {Maze} from '../js/maze.js'
import assert from 'assert'

describe('Maze', function() {
  describe('maze', function() {
    it('', function() {
      let maze = new Maze(20)
      let result = maze.create()
      console.log(result.state.s.toString())
    })
  })
})