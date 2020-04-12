"use strict";
exports.__esModule = true;
var OrdinaryNode_1 = require("./model/OrdinaryNode");
exports["default"] = {
    compile: function (expression) {
        return new OrdinaryNode_1.OrdinaryNode(expression, null);
    }
};
