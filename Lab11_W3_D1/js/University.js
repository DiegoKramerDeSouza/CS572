"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
function print(targetClass) {
    targetClass.prototype.printIt = function () {
        console.log(this);
    };
    targetClass.prototype.setName = function (name) {
        this.name = name;
    };
}
function department(d) {
    return function (targetClass) {
        return /** @class */ (function () {
            function class_1() {
                this.t = new targetClass();
                this.dept = d;
                this.name = this.t.name;
            }
            class_1.prototype.printIt = function () { };
            class_1.prototype.setName = function () { };
            return class_1;
        }());
    };
}
var University = /** @class */ (function () {
    function University(name) {
        if (name === void 0) { name = 'No name'; }
        this.name = name;
    }
    University.prototype.printIt = function () { };
    University.prototype.setName = function (n) { };
    University = __decorate([
        print,
        department('Computer Science'),
        __metadata("design:paramtypes", [String])
    ], University);
    return University;
}());
exports.University = University;
