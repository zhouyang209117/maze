./node_modules/.bin/babel  js -d lib
browserify lib/requestNextAnimationFrame.js -o dist/requestNextAnimationFrame.js
browserify lib/pos.js -o dist/pos.js
browserify lib/result.js -o dist/result.js
browserify lib/state.js -o dist/state.js
browserify lib/maze.js -o dist/maze.js
browserify lib/anim.js -o dist/anim.js