var adeunis = require('../adeunis-rf.js')

var test_node = null;

var RED = {};
RED.nodes={};
RED.nodes.registerType = function (name, obj) {
    console.log('registerType');
    obj()
}
RED.nodes.createNode = function(node, config) {
    console.log('createNode');
    test_node = node;
}

console.log(adeunis)
f = adeunis(RED)

test_node.send = function (argument) {
    console.log('register send')
    console.log(data);
}

test_node.on('input', data = [ 142, 37, 4, 0, 12, 222 ])
