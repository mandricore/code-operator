// require all `test/components/**/index.js`
const testsContext = require.context('./', true, /\.js$/)

testsContext.keys().forEach(testsContext)

// require all `src/components/**/index.js`
const componentsContext = require.context('../src/components/', true, /\.js$/);

componentsContext.keys().forEach(componentsContext);