// Counting Nodes
// <div>
//   <p>Then press the <em>Draw</em> button</p> 
// </div>

// This will have 11 nodes

// <div><p>Then press the <em>Draw</em> button.</p></div>

// This will have 9 nodes

// Child Nodes
// How many direct and indirect does each parent node have starting with id 1

// <div id="1">
//   <h1 id="2">Hello, <em id="3">World</em></h1>
//   <p id="4">
//     Welcome to wonderland. This is an
//     <span id="5">awesome</span> place.
//   </p>
//   <a href="#" id="6"><strong id="7">Enter</strong></a>
//   <div id="8"><p id="9"><a href="#" id="10">Go back</a></p></div>
// </div>

id 1 has 9 (4 element, 5 empty nodes) 12 indirect
id 2 has 2 (1 text node, 1 element node) 1 indirect
id 3 has 1 (1 text node)
id 4 has 3 (2 text nodes, 1 element node) 1 indirect
id 5 has 1 (1 text node)
id 6 has 1 (1 element node) 1 indirect
id 7 has 1 (1 text node)
id 8 has 1 (1 element node) and 2 indirect
id 9 has 1 (1 elemet node) and 1 indirect
id 10 has 1 (1 text node)

// Write code that returns the number of direct and indirect child nodes for a given
// parent node as an array

// use childNodes to get the number of direct children of a node
// Recursively add up all the childNodes of each node in the parent node to get the
  // number of indirect child nodes

// the arg will be a reference to the id

function childNodes(id) {
  var currentNode = document.getElementById(String(id));
  var indirectChildrenCount = 0

  function countIndirectChildNodes(node) {
    var children = node.childNodes;

    for (var i = 0; i < children.length; i++) {
      indirectChildrenCount += children[i].childNodes.length;
      countIndirectChildNodes(children[i]);
    }
  }

  countIndirectChildNodes(currentNode)

  return [currentNode.childNodes.length, indirectChildrenCount];
}

// Tracing the DOM Tree
// Write a function that takes an element's `id` and returns the DOM tree
// of the element in a two dimensional array
// First subarray contains element and its sibling
// second contains the parent of the element and its siblings, etc
// Assume the highest level is an element with an `id` of "1"

// Find the current element using getElementByID
// Find its parent using parentNode
// Find all of its parents childElement nodes using `children`
// Use map to convert each node into its tag name using nodeName
// Continue the process until we reach id = "1"
  // Check node id using node.getAttribute('id')

function domTreeTracer(id) {
  var domTree = [];
  var currentNode = document.getElementById(id);

  while (currentNode.getAttribute('id')) {
    domTree.push([...currentNode.parentNode.children].map(child => child.nodeName));
    currentNode = currentNode.parentNode;
  }

  return domTree;
}

// Tree Slicing

// Implement a function sliceTree that is similar to Array.prototype.slice method
// but for a DOM tree
// Takes two args, start idx which is parent node's id attr, and end idx which is
// innermost child node's id attr
// The function returns an array of tagNames

// NOTES:
  // end idx doesn't have to be the id of the innermost child node
  // Only consider element nodes
  // Only elements that have body as an ancestor are sliceable
  // if the id attr of the start or end idx is not in the DOM return undefined
  // if the slice is not feasible (no path connecting the two elements) return undefined

// Use the end id node as the starting point
// use parentNode to move up the chain until we get to document.body OR the start id
// At each node, use shift to add the tagName to the array
// If it reaches body, return undefined
// Otherwise return the array that we have built up

function sliceTree(start, end) {
  var nodesOnPath = [];
  var currentNode = document.getElementById(end);

  while (currentNode && currentNode.tagName !== 'BODY') {
    nodesOnPath.unshift(currentNode.tagName);
    if (currentNode.getAttribute('id') === String(start)) return nodesOnPath;
    currentNode = currentNode.parentNode;
  }
}

// Coloring

// Write a function that colors a specific generation of the DOM tree
// A generation is a set of elements that are on the same level of indentation
// use .generation-color class to color the specific generation
// Only non-negative ints will be provided as args

// Use a walk function that will walk down n - 1 levels
// Push the children of the nodes at that level to an array
// walk down n -1 levels recusirvely and push each n - 1 children to an array
// iterate through the array of nodes to add a style to each of the element

function colorGeneration(n) {
  function setGenerationN(nodes, generation) {
    for (var i = 0; i < nodes.length; i++) {
      if (generation === n) {
        return [...nodes].forEach(node => node.classList.add('generation-color'));
      }
      setGenerationN(nodes[i].children, generation + 1);
    }
  }

  setGenerationN(document.body.children, 1);
}

// Node Swap
// Write a function that takes two element `id`s as args and swaps the positions
// of the elements represented by the `id`s. 
// Returns true if swap is valid, undefined if invalid
// Assume nodes will have a value for id and two args will be provided

// Need to get reference to both of the nodes with the id
// find their parent, and use parent.replaceChild(node, targetNode)

function nodeSwap(id1, id2) {
  var node1 = document.getElementById(id1);
  var node2 = document.getElementById(id2);

  if (node1 && node2 && !node1.contains(node2) && !node2.contains(node1)) {
    var node2Clone = node2.cloneNode(true);
    node1.insertAdjacentElement('afterend', node2Clone);
    return !!(node2.parentNode.replaceChild(node1, node2));
  }
}

// Further exploration: don't use replaceChild because it doesn't preserver
// Event listeners (cloneNode also doesn't preserve event listeners)

function nodeSwap(id1, id2) {
  var node1 = document.getElementById(id1);
  var node2 = document.getElementById(id2);

  if (node1 && node2 && !node1.contains(node2) && !node2.contains(node1)) {
    
    [node1, node2].forEach((node, idx) => {
      var temp = document.createElement('div');
      temp.setAttribute('id', `pos${idx + 1}`);
      node.insertAdjacentElement('afterend', temp);
    });

    ['pos2', 'pos1'].forEach((id, idx) =>  {
      var temp = document.getElementById(id);
      temp.parentNode.replaceChild(idx === 0 ? node1 : node2, temp);
    });

    return true;
  }
}

// Nodes to Array

// Implement a function that converts the DOM, starting from the body, to nested arrays
// Each element in the DOM is presentated as ["PARENT_TAG", [children]]
// When an element has no children it will be ["PARENT_TAG", []]

// Need to recursively walk through the DOM tree and for each element map
// start with currentNode = document.body
// use a for loop to loop through each current node
// map document.body to [currentNode.tagName, [currentNode.children]]
// Call the function again using currentNode.children
// If currentNode.children is null then return
// the node to [NODE_TAG, [children_nodes]]
// If children_nodes is null, map to empty array

function nodesToArr(startingNodes) {
  if (startingNodes === null) return [];
  var currentNodes = startingNodes || [document.body];

  return [...currentNodes].map(node => [node.tagName, nodesToArr(node.children)]);
}

// Array to Nodes

// Implement a functoin that converts a nested array of nodeNames to nodes
// need to use document.createElement(currentTag)
// Then append that node to the current parent (appendChild)
// Need to do this to using forEach
// If the element is an array, call the function again passing in the current nodeArray

function arrayToNodes(nodesArr, parentNode = document.documentElement) {
  nodesArr.forEach(nodeName => {
    if (nodeName.constructor === String) {
      parentNode.appendChild(document.createElement(nodeName));
    } else {
      arrayToNodes(nodeName.flat(1), parentNode.lastChild);
    }
  });
}

// Work Back

// Given the following JS code, create the corresponding HTML that results to the same logs
// to the console when executed in sequence

// <!DOCTYPE html>
// <html>
//   <head>
//     <title>Title</title>
//   </head>
//   <body>
//     <header>Header</header>
//     <main>
//       <div>
//         <section>
//           <h1>H1</h1>
//           <p>Hello</p>
//           <p>World</p>
//         </section>
//       </div>
//     </main>
//     <footer>
//       <span class="emphasis">
//       </span>
//     </footer>
//   </body>
// </html>

// HTML Imaging

// Given the JS code, create the HTML that matches the DOM rendered by browser

// Starting HTML:

// <!doctype html>
// <html>
//   <head>
//     <title>HTML Imaging</title>
//   </head>
//   <body>
//   </body>
// </html>

var node1 = document.createElement('header');
var node2 = document.createTextNode('Dynamic Content');

node1.innerHTML = '<p>Hello World!</p>';
document.body.appendChild(node1);
document.body.firstElementChild.insertBefore(node2, node1.firstElementChild);

var node3 = document.createElement('h1');
node3.appendChild(node2);
document.body.firstElementChild.insertBefore(node3, node1.firstElementChild);

node1.setAttribute('id', 'header');
node3.classList.add('emphasis');
node3.classList.add('light');

var node4 = document.createElement('style');
var css1 = ".emphasis { font-weight: bold; }";
var css2 = ".light { color: gray; }";
node4.type = 'text/css';

node4.appendChild(document.createTextNode(css1));
node4.appendChild(document.createTextNode(css2));

document.head.appendChild(node4);

// RESULTING HTML:

// <!doctype html>
// <html>
//   <head>
//     <title>HTML Imaging</title>
//     <style type="text/css">
//       .emphasis { font-weight: bold; }
//       .light { color: gray; }
//     </style>
//   </head>
//   <body>
//     <header id="header">
//       <h1 class="emphasis light">Dynamic Content</h1>
//       <p>Hello World!</p>
//     </header>
//   </body>
// </html>
