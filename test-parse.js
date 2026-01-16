// 测试解析和显示
import { parser } from './src/utils/jsonParser.js'

const testJson = JSON.stringify({
  root: {
    name: 'TOM',
    user: {
      name: 'Jerry',
      age: 25
    },
    tags: ['javascript', 'vue', 'json']
  }
}, null, 2)

console.log('测试 JSON:', testJson)
const result = parser(testJson)

console.log('节点数:', result.nodes.length)
console.log('边数:', result.edges.length)

console.log('\n节点列表:')
result.nodes.forEach((node, index) => {
  console.log(`${index + 1}. ID: ${node.id}, Text: ${JSON.stringify(node.text)}, Type: ${node.data?.type}, ChildrenCount: ${node.data?.childrenCount}`)
})

console.log('\n边列表:')
result.edges.forEach((edge, index) => {
  console.log(`${index + 1}. ${edge.from} -> ${edge.to}`)
})
