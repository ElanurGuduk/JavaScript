class Course{
    constructor(code,time,date,course){
        this.code=code;
        this.time=time;
        this.date=date;
        this.course=course;
    }
    toString(){
        return "Course's id is "+this.code;
    }
}

class Student{
    constructor(id,name,gpa,course){
        this.id=id
        this.name=name
        this.gpa=gpa
        this.course=course
    }
    toString(){
        return "Student's id is "+this.id;
    }
}
