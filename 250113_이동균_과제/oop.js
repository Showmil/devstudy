var Employee = /** @class */ (function () {
    //private _empName: string;
    //private _age: number;
    //private _empJob: string;
    function Employee(_empName, _age, _empJob) {
        var _this = this;
        this._empName = _empName;
        this._age = _age;
        this._empJob = _empJob;
        this.printEmp = function () {
            console.log(_this._empName + '의 나이는' + _this._age + '이고, 직업은 ' + _this._empJob + '입니다.');
        };
    }
    Object.defineProperty(Employee.prototype, "empName", {
        get: function () {
            return this._empName;
        },
        set: function (val) {
            this._empName = val;
        },
        enumerable: false,
        configurable: true
    });
    return Employee;
}());
var employee1 = new Employee("donggyun", 23, "developer");
employee1.printEmp();
