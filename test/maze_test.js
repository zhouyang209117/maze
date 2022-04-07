import {Maze} from '../maze.js'
import assert from 'assert'

describe('Maze', function() {
  describe('maze', function() {
    it('', function() {
      let maze = new Maze(30)
      let result = maze.create()
      console.log(result.finish)
      console.log(result.s.toString())
    })
  })
})