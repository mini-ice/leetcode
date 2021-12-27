function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

const createTree = (arr) => {
  let tree = null;
  let quene = [];
  while (arr.length > 0) {
    // if()
    let val = arr.shift();
    if (quene.length === 0) {
      tree = new TreeNode(val);
      val || val === 0 ? quene.push(tree) : quene.push(null);
    } else {
      let tree = undefined;
      while (!tree) {
        tree = quene.shift();
      }
      if (tree) {
        tree.left = val || val === 0 ? new TreeNode(val) : null;
        quene.push(tree.left);
        let rightVal = arr.shift() || null;
        tree.right = rightVal || rightVal === 0 ? new TreeNode(rightVal) : null;
        quene.push(tree.right);
      }
    }
  }
  return tree;
};

export default createTree;

// // [1,2,3,4]
// let a = new TreeNode(1)
// let b = (a.left = new TreeNode(2))
// let c = (a.right = new TreeNode(3))
// let d = (b.left = new TreeNode(4))
