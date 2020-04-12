const Node = require("../dist/index").default;

let node = Node.compile("\\w{6,12}@[a-z0-9]{3}\\.(com|cn)");
for (let i = 0; i < 10; i++) {
  console.log(node.random())
}