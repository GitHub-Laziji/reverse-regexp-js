const Node = require("../dist/index").default;

function random(expression, title) {
  console.log(`${title} ${expression}`);
  let node = Node.compile(expression);
  for (let i = 0; i < 10; i++) {
    let data = node.random();
    console.log(`[${new RegExp(`^(${expression})$`).test(data)}] ${data}`);
  }
  console.log();
}

random("\\w{6,12}@[a-z0-9]{3}\\.(com|cn)", "邮箱");
random("1(3|5|7|8)\\d{9}", "手机号");
random("-?[1-9]\\d*\\.\\d+", "浮点数");
random("https?://[\\w-]+(\\.[\\w-]+){1,2}(/[\\w-]{3,6}){0,2}(\\?[\\w_]{4,6}=[\\w_]{4,6}(&[\\w_]{4,6}=[\\w_]{4,6}){0,2})?", "网址");