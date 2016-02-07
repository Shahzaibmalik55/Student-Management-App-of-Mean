import { bootstrap } from "angular2/platform/browser" ;
import { Component, EventEmitter } from "angular2/core" ;
import { Http, Response, RequestOptions, Headers } from 'angular2/http';
import { HTTP_PROVIDERS } from 'angular2/http';


class newStudent {
	name: string;
	lastName: string;
    university: string;
	className: string;
	rollNo: string;
    subject: string;
	id: Date;
    
	
	constructor(name: string,lastName: string,university: string,className: string,rollNo: string,subject: string,id?: Date){
		this.name = name,
		this.lastName = lastName,
        this.university = university,
		this.className = className,
		this.rollNo = rollNo,
        this.subject = subject,
		this.id = new Date()
		
	}

}


@Component({
	selector: 'tbody',
	inputs: ['students'],
	outputs:['deleteStudent','UpdateInfo'],
	templateUrl: 'studentTable.html'
})

class studentTable {
	student :newStudent;
	public http: Http;
    
	deleteStudent: EventEmitter<newStudent>
    UpdateInfo: EventEmitter<newStudent>
	
	constructor(){
		this.deleteStudent = new EventEmitter();
        this.UpdateInfo = new EventEmitter()
		
	}
	delete(student){
        console.log(student)
             this.deleteStudent.emit(student);
        // })
        // console.log(student);
       
    }
    update(student){
        this.UpdateInfo.emit(student);
    }
}

@Component({
	selector: 'student-App',
	directives:[studentTable],
	templateUrl: 'studentData.html',
	
	
	
})

class studentApp{
	students: newStudent[] = [];
	
    constructor(public http: Http){
     this.getStudents()   
    }
    
	addStudent(firstName: HTMLInputElement, lastName:HTMLInputElement, university: HTMLInputElement, className: HTMLInputElement, rollNo: HTMLInputElement, subject: HTMLInputElement){
            if(firstName.value == "" || lastName.value == ""){
                document.getElementById('error').innerHTML = "Please Enter First and Last Name";
            }
            else
            {
			var obj = new newStudent(firstName.value,lastName.value,university.value,className.value,rollNo.value,subject.value)
             let headers: Headers = new Headers();
            headers.append('Content-Type', 'application/json');

            let opts: RequestOptions = new RequestOptions();
            opts.headers = headers;
               
             this.http.post('http://localhost:5000/addStudent',JSON.stringify(obj),opts).subscribe((res: Response) => {
                 console.log(res.json())
                 setTimeout(()=>{
                this.students = res.json();
            }, 3000)
             })   
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
	}
	delete(student){
        // console.log(student);
        this.http.delete('http://localhost:5000/deleteStudent/'+ student._id).subscribe((res: Response) => {        
        for(var i = 0; i < this.students.length; i++){
            if(this.students[i].id == student.id){
                this.students.splice(i,1)
            }
        }
    })
    }
    
    updateinfo(student){
        console.log(student);
        document.getElementById('firstname')['value'] = student.name;
        document.getElementById('lastname')['value'] = student.lastName;
        document.getElementById('university')['value'] = student.university;
        document.getElementById('class')['value'] = student.className;
        document.getElementById('subject')['value'] = student.subject;
        document.getElementById('rollno')['value'] = student.rollNo;
        this.delete(student)
    }
	getStudents(){
        this.http.request('http://localhost:5000/getStudents').subscribe((res: Response) => {
            // console.log(res.json())
            this.students = res.json()
        })
    }
}

bootstrap(studentApp, [HTTP_PROVIDERS])