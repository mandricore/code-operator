const grasp = require('grasp')
const replacer = grasp.replace('equery', '__ + __', '{{.l}} - {{.r}}')
const processed = {}
processed.code1 = replacer(code)

const nodes = grasp.search('squery', 'if', code);

// const processedCode = grasp.replace('squery', 'if.test', '!({{}})', code);

processed.code2 = grasp.replace('squery', 'call[callee=#require]', function(getRaw, node, query) {
    var req = query(".args")[0];
    return "import " + camelize(path.basename(req.value, ".js")) + " from " + getRaw(req);
}, code);

