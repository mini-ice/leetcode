// 邻接矩阵 无向图
class Adjoin {
  constructor(vertex) {
    this.vertex = vertex
    this.quantity = vertex.length
    this.adjoinArr = null
    this.vertexMap = new Map()
    this.init()
  }
  init() {
    this.adjoinArr = new Array(this.quantity * this.quantity).fill(0)
    this.vertex.forEach((id, index) => {
      this.vertexMap.set(id, index)
    })
  }
  getVertexCol(id) {
    const index = this.vertexMap.get(id)
    const col = []
    this.vertex.forEach((item, pIndex) => {
      col.push(this.adjoinArr[index + this.quantity * pIndex])
    })
    return col
  }

  getAdjoinVertexs(id) {
    return this.getVertexCol(id).reduce((result, val, index) => {
      if (val) {
        result.push(this.vertex[index])
      }
      return result
    }, [])
  }

  setAdjoinVertexs(id, sides) {
    const pIndex = this.vertexMap.get(id)
    sides.forEach((item) => {
      let index = this.vertexMap.get(item)
      this.adjoinArr[pIndex * this.quantity + index] = 1
      this.adjoinArr[index * this.quantity + pIndex] = 1
    })
  }
}

let a = new Adjoin(['v0', 'v1', 'v2', 'v3', 'v4'])

a.setAdjoinVertexs('v0', ['v2', 'v3'])
a.setAdjoinVertexs('v1', ['v3', 'v4'])
a.setAdjoinVertexs('v2', ['v3', 'v4'])

console.log(a.getAdjoinVertexs('v0'))
