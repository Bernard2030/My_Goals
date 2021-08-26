import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Goal } from '../goal';
import { ActivatedRoute, paramMap } from '@angular/router';
import { GoalService } from '../goal-service/goal.service';

@Component({
  selector: 'app-goal-detail',
  templateUrl: './goal-detail.component.html',
  styleUrls: ['./goal-detail.component.css']
})
export class GoalDetailComponent implements OnInit {


  @Input() goal: Goal;
  @Output() isComplete = new EventEmitter<boolean>();
  goalDelete(complete:boolean){
    this.isComplete.emit(complete);
  }
  constructor() { }

  ngOnInit(): void {
    let id = this.rout.snapshot.paramMap.get('id');
    this.goal = this.service.getGoal(id)
  }

}
