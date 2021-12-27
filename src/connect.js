import createTree from '../utils/createTree.mjs'

/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function(root) {
  if(!root) return root
  const bfs = (quene) => {
    let newQuene = []
    if(quene.length === 0) return
    while(quene.length){
      if(quene[0]){
        quene[0].next = quene[1] || null
        newQuene.push(quene[0].left)
        newQuene.push(quene[0].right)
      }
      quene.splice(0,1)
    }
    bfs(newQuene)
    // bfs([])
  }
  bfs([root])
  return root
};
let p = createTree([1,2,3,4,5,6,7])
connect(p)