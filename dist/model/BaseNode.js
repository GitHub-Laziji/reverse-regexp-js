"use strict";
exports.__esModule = true;
var BaseNode = /** @class */ (function () {
    function BaseNode(expression, expressionFragments, initialize) {
        if (initialize === void 0) { initialize = true; }
        if (expression == null && expressionFragments == null) {
            throw new Error();
        }
        if (expression == null) {
            expression = "";
            for (var _i = 0, expressionFragments_1 = expressionFragments; _i < expressionFragments_1.length; _i++) {
                var fragment = expressionFragments_1[_i];
                expression += fragment;
            }
        }
        if (expressionFragments == null) {
            expressionFragments = this.spliceExpression(expression);
        }
        this.expression = expression;
        this.expressionFragments = expressionFragments;
        if (initialize) {
            this.init();
        }
    }
    BaseNode.prototype.getExpression = function () {
        return this.expression;
    };
    BaseNode.prototype.random = function () {
        if (!this.isInitialized()) {
            throw new Error();
        }
        return this.baseRandom(this.expression, this.expressionFragments);
    };
    BaseNode.prototype.test = function () {
        return this.baseTest(this.expression, this.expressionFragments);
    };
    BaseNode.prototype.init = function () {
        if (!this.initialized) {
            if (!this.test()) {
                throw new Error();
            }
            this.baseInit(this.expression, this.expressionFragments);
            this.initialized = true;
        }
    };
    BaseNode.prototype.isInitialized = function () {
        return this.initialized;
    };
    BaseNode.prototype.baseRandom = function (expression, expressionFragments) {
        return null;
    };
    BaseNode.prototype.baseInit = function (expression, expressionFragments) {
    };
    BaseNode.prototype.baseTest = function (expression, expressionFragments) {
        return true;
    };
    BaseNode.prototype.spliceExpression = function (expression) {
        var l = 0;
        var r = expression.length;
        var fragments = [];
        while (true) {
            var result = this.findFirst(expression, l, r);
            if (!result) {
                break;
            }
            fragments.push(result);
            l += result.length;
        }
        return fragments;
    };
    BaseNode.prototype.findFirst = function (expression, l, r) {
        if (l == r) {
            return null;
        }
        if (expression.charAt(l) == '\\') {
            if (l + 1 >= r) {
                throw new Error();
            }
            return expression.substring(l, l + 2);
        }
        if (expression.charAt(l) == '[') {
            var i = l + 1;
            while (i < r) {
                if (expression.charAt(i) == ']') {
                    return expression.substring(l, i + 1);
                }
                if (expression.charAt(i) == '\\') {
                    i++;
                }
                i++;
            }
            throw new Error();
        }
        if (expression.charAt(l) == '{') {
            var i = l + 1;
            var hasDelimiter = false;
            while (i < r) {
                if (expression.charAt(i) == '}') {
                    return expression.substring(l, i + 1);
                }
                if (expression.charAt(i) == ',') {
                    if (hasDelimiter) {
                        throw new Error();
                    }
                    hasDelimiter = true;
                    i++;
                    continue;
                }
                if (expression.charAt(i) < '0' || expression.charAt(i) > '9') {
                    throw new Error();
                }
                i++;
            }
            throw new Error();
        }
        if (expression.charAt(l) == '(') {
            var i = l + 1;
            while (true) {
                var result = this.findFirst(expression, i, r);
                if (result == null || result.length == 0 || result.length + i >= r) {
                    throw new Error();
                }
                i += result.length;
                if (expression.charAt(i) == ')') {
                    return expression.substring(l, i + 1);
                }
            }
        }
        return expression.substring(l, l + 1);
    };
    return BaseNode;
}());
exports.BaseNode = BaseNode;
