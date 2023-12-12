const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.node = null;
  }

  root() {
    return this.node;
  }

  add(data) {
    function addInside(node, data) {
      if (!node) return new Node(data);
      if (node.data === data) return node;

      if (data < node.data) node.left = addInside(node.left, data);
      else node.right = addInside(node.right, data);

      return node;
    }

    this.node = addInside(this.node, data);
  }

  has(data) {
    function searchInside(node, data) {
      if (!node) return false;
      if (node.data === data) return true;
      if (data < node.data) return searchInside(node.left, data);
      else return searchInside(node.right, data);
    }

    return searchInside(this.node, data);
  }

  find(data) {
    function findInside(node, data) {
      if (!node) return null;
      if (node.data === data) return node;
      if (data < node.data) return findInside(node.left, data);
      else return findInside(node.right, data);
    }

    return findInside(this.node, data);
  }

  remove(data) {
    function removeNode(node, data) {
      if (!node) return null;

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) return null;

        if (!node.left) {
          node = node.right;
          return node;
        }
        if (!node.right) {
          node = node.left;
          return node;
        }

        let minRight = node.right;

        while (minRight.left) minRight = minRight.left;

        node.data = minRight.data;
        node.right = removeNode(node.right, minRight.data);

        return node;
      }
    }

    return removeNode(this.node, data);
  }

  min() {
    if (!this.node) return;

    let minNode = this.node;

    while (minNode.left) minNode = minNode.left;

    return minNode.data;
  }

  max() {
    if (!this.node) return;

    let maxNode = this.node;

    while (maxNode.right) maxNode = maxNode.right;

    return maxNode.data;
  }
}

module.exports = {
  BinarySearchTree,
};
