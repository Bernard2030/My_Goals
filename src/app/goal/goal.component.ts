import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Goal } from '../goal';
import { Quote } from '../quote-class/quote';
import { Goals } from '../goal-list';
import { GoalService } from '../goal-service/goal.service';
import { AlertService } from '../alert-service/alert.service';
import { QuoteRequestService } from '../quote-http/quote-request.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css'],
  providers: [GoalService]
})
export class GoalComponent implements OnInit {
  [x: string]: any;

  goToUrl(id){
    this.router.navigate(['/goals', id])
  }

  goals:Goal[];
alertService:AlertService;
quote:Quote;



  constructor(goalService:GoalService, alertService:AlertService,private http:HttpClient, private quoteService:QuoteRequestService, private router:Router) {
    this.goals = goalService.getGoals()
    this.alertService = alertService;
  }
  addNewGoal(goal){
    let goalLength = this.goals.length;
    goal.id = goalLength+1;
    goal.completeDate = new Date(goal.completeDate)
    this.goals.push(goal)
  }
  toggleDetails(index){
    this.goals[index].showDescription = !this.goals[index].showDescription;
  }  completeGoal(isComplete, index){
    if (isComplete) {
      this.goals.splice(index,1);
    }
  }
  deleteGoal( index){
    let toDelete = confirm('Are you sure you want to delete ${this.goals[index].name}')

    if (toDelete){
      this.goals.splice(index, 1)
      this.alertService.alertMe("Goal has been deleted")
    }
   }
   ngOnInit():void {

    this.quoteService.quoteRequest()
    interface ApiResponse{
      author:string;
      quote:string;
    }
    this.http.get<ApiResponse>("http://quotes.stomconsultancy.co.ku/random.json").subscribe(data=>{
      //successful API request
      this.quote = new Quote(data.author, data.quote)
    }, err=>{
      this.quote = new Quote("Winston Churchill", "Never never give up!")
      console.log("An error occurred")
    })
   }
}
