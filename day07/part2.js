const util = require('util');

const decodeNode = (node) => {
    let  matches = node.match(/(\w*) \((\d+)\) -> (.*)/);
    // console.log(matches);
    if (matches) {
        const children = {};
        matches[3].trim().split(', ').map((name) => {
            children[name] = {};
        });
        return {
            name: matches[1],
            weight: parseInt(matches[2]),
            children: children,
        };
    } else if (matches = node.match(/(\w*) \(([0-9]*)\)/)) {
        return {
            name: matches[1],
            weight: parseInt(matches[2]),
        };
    }

    return false;
};

const placeNode = (node, nodeTree) => {
    if (!nodeTree.children) {
        return false;
    }
    let i = Object.keys(nodeTree.children).indexOf(node.name);
    if (i !== -1) {
        //console.log('placed ' + node.name + ' in ' + nodeTree.name);
        nodeTree.children[node.name] = node;
        return true;
    } else {
        for (let i in nodeTree.children) {
            if (nodeTree.children[i].children) {
                if (placeNode(node, nodeTree.children[i])) {
                    //console.log('deep placed ' + node.name + ' in ' + nodeTree.children[i].name);
                    return true;
                }
            }
        }
    }

    return false;
};


fs = require('fs');

// const input = fs.readFileSync('./testInput.txt'),
const input = fs.readFileSync('./input.txt'),
    lines = (new String(input)).split("\n");

const allNodes = {children: {}};
for (let i = 0; i < lines.length; i++) {
    const node = decodeNode(lines[i]);
    allNodes.children[node.name] = node; 
}

//console.log(Object.keys(allNodes.children).length);

// first pass, move the childless nodes to their parents
while (Object.keys(allNodes.children).length > 1) {
    // loop over each node in the main train level
    for (let key in allNodes.children) {
        //process.stdout.write(key + ': ');
        let node = allNodes.children[key],
            placed = false;
        
        // see if it can be placed within one of the other nodes in the tree
        for (let key2 in allNodes.children) {
            let node2 = allNodes.children[key2];
            if (key !== key2) {
                if (placeNode(node, node2)) {
                    //process.stdout.write(key2 + ' ... delete key ' + key);
                    delete allNodes.children[key];
                    placed = true;
                    break;
                }
            }
        }

        //process.stdout.write("\n");

        if (placed) {
            break;
        }
    }
}

// allNodes.children is now assembled, so we can calculate the tower weights now
const bottomKey = Object.keys(allNodes.children)[0];

const deriveActualWeights = function(node) {
    if (!node.children || node.children.length < 1) {
        node.actualWeight = parseInt(node.weight);
        return node.actualWeight;
    } else {
        node.actualWeight = parseInt(node.weight);
        node.childrenWeight = 0;
        for (let i in node.children) {
            node.childrenWeight += deriveActualWeights(node.children[i]);
        }
        node.actualWeight += node.childrenWeight;
        return node.actualWeight;
    }
}

deriveActualWeights(allNodes);

// console.log(util.inspect(allNodes, {showHidden: false, depth: null}))

// I'm tired and annoyed by today's puzzle
// just going to sift through this and find it manually
console.log(JSON.stringify(allNodes));