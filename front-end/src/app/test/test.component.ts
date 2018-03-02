import { Component, OnInit } from '@angular/core';
import { Questions } from '../model/questions';
import { Test } from '../model/test';
import { DataService} from '../services/data.service';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  
  // For creating a new test
  ques_IDs: string[] = [];
  skills: string[] = [];
  recruiter_id: string;
  designation: string;
  skills_input = ["A"];
  log = '';

  // For fetching questions
  all_ques: Questions[];
  generalQues: Questions[];
  psychQues: Questions[];
  newQues: Questions;
  generalCriteria: string;
  psychCriteria: string;
  no_of_answers: number;
  answers: string[] = [];
  answer_input = ["a", "B"];
  nothing:string = "";


  // For fetching tests
  allTests: Test[];
  newTest: Test;

  constructor(private dataService: DataService) { }

  ngOnInit() {

  	this.newQues = Questions.CreateDefault();
    this.newQues.question_category = "Select category";
  	this.generalCriteria = "general";
  	this.psychCriteria = "psychometric";
  	this.no_of_answers = 0;
  	this.getQuestions();
  	this.newTest = Test.CreateDefault();
    this.getTestDetails();
    this.newTest = Test.CreateDefault();
  }


  // Delete a test
  deleteTest(test: Test) {

    this.dataService.deleteTest(test)
    .subscribe(
      data => {
        this.allTests.splice(this.allTests.indexOf(test), 1);
        console.log("Tests deleted!");
      })
  }



  // Fetching all the questions
  getQuestions(){

  	this.dataService.getQuestions("", "fromCreateTest")
    .subscribe(
      data => {
        this.all_ques = [];
        this.generalQues = [];
        this.psychQues = [];
         data.forEach(
           element => {
             var newQues = new Questions(element._id, 
                                element.question_name, 
                                element.answers,
                                element.correct_answer,
                                element.question_type,
                                element.question_category);
             if (newQues.question_category == "psychometric") {
               this.psychQues.push(newQues);
             }
             else {
               this.generalQues.push(newQues); 
             }
             this.all_ques.push(newQues);
           })
      });  
   } 


   insertQuestion(){

    if (this.newQues.question_name == "" || this.newQues.question_type == "" || this.newQues.question_category == "Select category"
      || this.newQues.answers == null || this.newQues.correct_answer == "Select correct answer") {
      console.log("Please fill all the details.");
    }
    else {
        // For inserting answer options array
      for (var i = 0; i < this.answer_input.length; i++) {
        var elemID = "options" + i;
        var newItem = (<HTMLInputElement>document.getElementById(elemID)).value;
        this.answers.push(newItem);
        console.log(newItem);
      }
      this.newQues.answers = this.answers;
      this.dataService
        .insertNewQuestion(this.newQues)
        .subscribe(
         data => {
           this.newQues._id = data.id;
           this.newQues = Questions.CreateDefault();
           for (var i = 0; i < this.answer_input.length; i++) {
             var elemID = "options" + i;
             (<HTMLInputElement>document.getElementById(elemID)).value = "";
           }
           console.log("Added question.");
           this.newQues = Questions.CreateDefault();
           this.newQues.question_category = "Select category";
           this.getQuestions();
        })    
    } // else closed
  
  }

  // Creating new test
  createTest() {

  	// For inserting answer options array
  	for (var i = 0; i < this.skills_input.length; i++) {
  		var elemID = "skills" + i;
  		var newItem = (<HTMLInputElement>document.getElementById(elemID)).value;
  		this.skills.push(newItem);
  		console.log(newItem);
  	}
  	this.newTest.skills = this.skills;
  	this.newTest.question_IDs = this.ques_IDs;
  	this.dataService
    .createNewTest(this.newTest)
    .subscribe(
      data => {
         this.newTest._id = data.id;
         // this.all_ques.push(this.newQues);
         this.newTest = Test.CreateDefault();
         this.skills = [];
         console.log("Added test successfully.");
      }
   );
    window.location.reload();
  	
  }



  // View all the tests created
  getTestDetails() {
    this.dataService.getTestDetails("", "viewTests")  // <-- ID of the Test
    .subscribe(
      data => {
          this.allTests = [];
          data.forEach(
           element => {
             var a = new Test(element._id, 
                              element.recruiter_id,
                              element.designation,
                              element.question_IDs, 
                              element.skills);
             this.newTest = a;
             this.allTests.push(this.newTest);
             this.newTest = Test.CreateDefault();
           })
      });
      
    }  



  // For adding answer fields
  addAnswers(){
  	this.answer_input.push("a");
  }

  // For removing answer fields
  removeAnswers(){
  	this.answer_input.pop();
  }

   // For adding answer fields
  addSkills(){
  	this.skills_input.push("a");
  }

  // For removing answer fields
  removeSkills(){
  	this.skills_input.pop();
  }


  logGeneralQuestions(id): void {
    // console.log("This is the selected ID: ", id);
    this.ques_IDs.push(id);
  }
  logPsychQuestions(id): void {
  	this.ques_IDs.push(id);
  }


}