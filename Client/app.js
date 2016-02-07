System.register(["angular2/platform/browser", "angular2/core", 'angular2/http'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var browser_1, core_1, http_1, http_2;
    var newStudent, studentTable, studentApp;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
                http_2 = http_1_1;
            }],
        execute: function() {
            newStudent = (function () {
                function newStudent(name, lastName, university, className, rollNo, subject, id) {
                    this.name = name,
                        this.lastName = lastName,
                        this.university = university,
                        this.className = className,
                        this.rollNo = rollNo,
                        this.subject = subject,
                        this.id = new Date();
                }
                return newStudent;
            })();
            studentTable = (function () {
                function studentTable() {
                    this.deleteStudent = new core_1.EventEmitter();
                    this.UpdateInfo = new core_1.EventEmitter();
                }
                studentTable.prototype.delete = function (student) {
                    console.log(student);
                    this.deleteStudent.emit(student);
                    // })
                    // console.log(student);
                };
                studentTable.prototype.update = function (student) {
                    this.UpdateInfo.emit(student);
                };
                studentTable = __decorate([
                    core_1.Component({
                        selector: 'tbody',
                        inputs: ['students'],
                        outputs: ['deleteStudent', 'UpdateInfo'],
                        templateUrl: 'studentTable.html'
                    }), 
                    __metadata('design:paramtypes', [])
                ], studentTable);
                return studentTable;
            })();
            studentApp = (function () {
                function studentApp(http) {
                    this.http = http;
                    this.students = [];
                    this.getStudents();
                }
                studentApp.prototype.addStudent = function (firstName, lastName, university, className, rollNo, subject) {
                    var _this = this;
                    if (firstName.value == "" || lastName.value == "") {
                        document.getElementById('error').innerHTML = "Please Enter First and Last Name";
                    }
                    else {
                        var obj = new newStudent(firstName.value, lastName.value, university.value, className.value, rollNo.value, subject.value);
                        var headers = new http_1.Headers();
                        headers.append('Content-Type', 'application/json');
                        var opts = new http_1.RequestOptions();
                        opts.headers = headers;
                        this.http.post('http://localhost:5000/addStudent', JSON.stringify(obj), opts).subscribe(function (res) {
                            console.log(res.json());
                            setTimeout(function () {
                                _this.students = res.json();
                            }, 3000);
                        });
                        // console.log(obj)
                        // this.students.push(obj)
                        document.getElementById('error').innerHTML = "";
                        firstName.value = "";
                        lastName.value = "";
                        university.value = "";
                        className.value = "";
                        rollNo.value = "";
                        subject.value = "";
                    }
                };
                studentApp.prototype.delete = function (student) {
                    var _this = this;
                    // console.log(student);
                    this.http.delete('http://localhost:5000/deleteStudent/' + student._id).subscribe(function (res) {
                        for (var i = 0; i < _this.students.length; i++) {
                            if (_this.students[i].id == student.id) {
                                _this.students.splice(i, 1);
                            }
                        }
                    });
                };
                studentApp.prototype.updateinfo = function (student) {
                    console.log(student);
                    document.getElementById('firstname')['value'] = student.name;
                    document.getElementById('lastname')['value'] = student.lastName;
                    document.getElementById('university')['value'] = student.university;
                    document.getElementById('class')['value'] = student.className;
                    document.getElementById('subject')['value'] = student.subject;
                    document.getElementById('rollno')['value'] = student.rollNo;
                    this.delete(student);
                };
                studentApp.prototype.getStudents = function () {
                    var _this = this;
                    this.http.request('http://localhost:5000/getStudents').subscribe(function (res) {
                        // console.log(res.json())
                        _this.students = res.json();
                    });
                };
                studentApp = __decorate([
                    core_1.Component({
                        selector: 'student-App',
                        directives: [studentTable],
                        templateUrl: 'studentData.html',
                    }), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], studentApp);
                return studentApp;
            })();
            browser_1.bootstrap(studentApp, [http_2.HTTP_PROVIDERS]);
        }
    }
});
//# sourceMappingURL=app.js.map