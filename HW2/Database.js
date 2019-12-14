class Course{
	constructor(kod,tarih,saat,...list){
		this.kod=kod;
		this.tarih=tarih;
		this.saat=saat;
		this.list=list;
	}
}
class Student{
	constructor(id,name,gpa,...list){
		this.id=id;
		this.name=name;
		this.gpa=gpa;
		this.list=list;
	}
}
class Database{
	constructor(){
		this.courses=new Map();
		this.students=new Map();
		this.readCrsData();
		this.readStData();		
	}

	readCrsData(){
		var url="https://maeyler.github.io/JS/data/Courses.txt" 
		fetch(url)
			.then(r => r.text())
        	.then(r => [this.addCourses(r)]);
	}
	addCourses(txt) {
    	let a = txt.split("\n");
    	for (let s of a) {
      		this.parseCourse(s);
    	}
	}
	parseCourse(line) {
		let [kod, tarih, saat, ...list] = line.split("\t");
  	  /*let kod = b[0], tarih = b[1], saat = b[2];
    	let list = [];
    	for (let i=3; i<b.length; i++) list.push(b[i]);
  	  */
    	let crs=new Course(kod,tarih,saat,list)
    	this.courses.set(crs.kod,crs)
	}

	readStData(){
		var url="https://maeyler.github.io/JS/data/Students.txt"
		fetch(url)
			.then(r => r.text())
        	.then(r => [this.addStudents(r)]);
	}
	addStudents(txt) {
    	let a = txt.split("\n");
    	for (let s of a) {
      		this.parseStudent(s);
    	}
	}
	parseStudent(line) {
    	let [id, name, gpa, ...list] = line.split("\t");
  	  /*let id = b[0], name = b[1], gpa = b[2];
    	let list = [];
    	for (let i=3; i<b.length; i++) list.push(b[i]);
  	  */
    	let st=new Student(id,name,gpa,list)
    	this.students.set(st.id,st)
	}

	randomStd(){
		let keys=Array.from(this.students.keys())
		let i = Math.trunc(this.students.size * Math.random());
		let b=keys[i];
    	let s = this.students.get(b)
    return ("Random student: "+s.id+" "+s.name)
	}
	aboveGpa(avg){
		let keys=Array.from(this.students.keys())
		let count=0	
		for (let i = 0; i <keys.length; i++) {
			let st=this.students.get(keys[i])
			if(st.gpa>avg){
				count++
			}
		}
	return ("Number of students above "+avg+" is : "+count)
	}
	//Exam schedule for a given student
	examSchedule(id){

	}
	stCourses(id){ //Ogrencinin aldigi dersler
		let st=this.students.get(id)
	return ("Student's courses :"+st.list);
	}
	studentsIn(code){
	code = code.toUpperCase();
    let a = "";
    for (let std of this.students.values()){
    	if (std.list[0].includes(code)){
            a+=std.id+" "+std.name+"\n";
        }
    }        
    return a;
	}
	//Total number of courses in a given room 
	numberOfCourses(room){
		room=room.toUpperCase();
		let c=0;
		for(let crs of this.courses.values()){			
			if(crs.list[0].includes(room))
				c++;			
		}
	return ("Total number of courses in "+room+" : "+c);
	}
	//Course list for a given exam room
 	courseList(examRoom){
 	let s=new Set()
	for (let crs of this.courses.values()){
		if(crs.list[0].includes(examRoom)){
			s.add(crs.kod)
		}
	 }
	s=Array.from(s)   
	return s;
	}
	//* One more query of your choice
	bestGpa(){
      const keys = Array.from(this.students.keys())
      let b = this.students.get(keys[0]);
      for (let std of this.students.values()) 
          if (std.gpa > b.gpa) 
          	b = std;

      return ("Best student: "+b.id+" "+ b.name+" "+ b.gpa);
	}

}