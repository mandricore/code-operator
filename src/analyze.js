const fs = require('fs')
const esprima = require('esprima')

function traverse (node, func) {
  func(node)
  for (var key in node) {
    if (node.hasOwnProperty(key)) { // 3
      var child = node[key]
      if (typeof child === 'object' && child !== null) { // 4
        if (Array.isArray(child)) {
          child.forEach((node) => { // 5
            traverse(node, func)
          })
        } else {
          traverse(child, func) // 6
        }
      }
    }
  }
}

function analyzeCode (code) {
  const ast = esprima.parse(code)
  let functionsStats = {} // 1
  let addStatsEntry = (funcName) => { // 2
    if (!functionsStats[funcName]) {
      functionsStats[funcName] = {calls: 0, declarations:0};
    }
  }

  traverse(ast, (node) => { // 3
    if (node.type === 'FunctionDeclaration') {
      addStatsEntry(node.id.name) // 4
      functionsStats[node.id.name].declarations++
    } else if (node.type === 'CallExpression' && node.callee.type === 'Identifier') {
      addStatsEntry(node.callee.name)
      functionsStats[node.callee.name].calls++ // 5
    }
  })
  processResults(functionsStats)
}


function processResults (results) {
  for (var name in results) {
    if (results.hasOwnProperty(name)) {
      var stats = results[name]
      if (stats.declarations === 0) {
        console.log('Function', name, 'undeclared')
      } else if (stats.declarations > 1) {
        console.log('Function', name, 'decalred multiple times')
      } else if (stats.calls === 0) {
        console.log('Function', name, 'declared but not called')
      }
    }
  }
}

// 2
if (process.argv.length < 3) {
  console.log('Usage: analyze.js file.js')
  process.exit(1)
}

// 3
var filename = process.argv[2]
console.log('Reading ' + filename)
var code = fs.readFileSync(filename)

analyzeCode(code)
console.log('Done')
