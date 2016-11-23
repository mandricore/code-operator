var aster = require('aster')
var equery = require('aster-equery')

// esnext support?
// aster.src.registerParser('.js', require('aster-parse-esnext'));


export function example1 () {
  aster.src('src/**/*.js')
  .map(equery({
    'if ($cond) return $expr1; else return $expr2;': 'return <%= cond %> ? <%= expr1 %> : <%= expr2 %>'
    // , ...
  }))
  .map(aster.dest('dist'))
  .subscribe(aster.runner)
}

export function example2 () {
  aster.src('src/**/*.js')
  .map(equery({
    'if[then=return][else=return]': 'return <%= test %> ? <%= consequent.argument %> : <%= alternate.argument %>'
    // , ...
  }))
  .map(aster.dest('dist'))
  .subscribe(aster.runner)
}
