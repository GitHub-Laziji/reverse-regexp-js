# Reverse Regexp JS
从正则表达式生成随机数据

## 安装
```
npm i reverse-regexp-js
```

## 使用
```js
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
```

```
邮箱 \w{6,12}@[a-z0-9]{3}\.(com|cn)
[true] Jtxq65IIs4@6et.com
[true] N6dgMqx@3fp.cn
[true] PdE9VCbHsm@iwe.cn
[true] uiHC5KT@xd7.cn
[true] F6rjBzm_@3ko.cn
[true] 63DDfHWUbcH@r1d.com
[true] ohLlmuP7D@8im.com
[true] Gj5cDn@tng.cn
[true] dbYYCZK@fna.com
[true] lidWxE@kgv.cn

手机号 1(3|5|7|8)\d{9}
[true] 18394387666
[true] 17198794815
[true] 13302320996
[true] 13993463722
[true] 13659131576
[true] 13210648735
[true] 17757142513
[true] 13120357027
[true] 15463373047
[true] 13229626283

浮点数 -?[1-9]\d*\.\d+
[true] 9544253739281.825854324
[true] -3514630221392761.41656638159843
[true] 87202.860
[true] 446.4
[true] -62172304824.681
[true] 1793916390807638.2060694602070
[true] 10464.5830884
[true] -287164572.642271169910
[true] 102580279.641238930471986
[true] -657934186.62926606731880

网址 https?://[\w-]+(\.[\w-]+){1,2}(/[\w-]{3,6}){0,2}(\?[\w_]{4,6}=[\w_]{4,6}(&[\w_]{4,6}=[\w_]{4,6}){0,2})?
[true] https://JpgCnSnnw8eaPe.vzCZaTOXfVQ_mYm.wRGZ3R0Bxs5skoFh/nV1
[true] https://kUUWuge4-.lzrXcs/L1bZRu?o08xxa=YDH6&sCKy1W=35ltOM
[true] http://xVbVmsnrX1f.cfCS.RE6yZWBW/bnX0u
[true] http://xGuQDvYfONr.Vr.i2?6ybZ=DGhM84&ckaC=6pXv
[true] http://lQUoMep2rrgps.gBI_wm.zcvdLkV/1OUmj9?hSqy=Qhlv&who8b=c4NzD&WyxSHH=0BgY
[true] http://th6MAgZIsF.rZIBz1.aRoDj0P-T?xrkqjx=h0DfY&SOArT=P7cMxf
[true] http://IXx1g40PRnz1P.r-1.a/iFR9L/J3k?TyNMi=EvSf47&y1B_=5l7w8_
[true] http://8X7Gxr7.nttaveUk9LANflC_/coAY
[true] https://uf.w6jhBFn-dj3o/DxAa3/0LBbrO
[true] http://2xBXYA.jNT.9TMzjz?v_k5J=1mRRO&h7OA=4YSr
```
