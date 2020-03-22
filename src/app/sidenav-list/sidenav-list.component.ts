import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AnsweredNode } from '../_models/answeredNode';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  @Output() backToNodeEvent = new EventEmitter<number>();

  answers: AnsweredNode[] = new Array();

  constructor() {}

  ngOnInit() {}

  onClose() {
    this.closeSidenav.emit();
  }

  addAnswer(event) {
    this.answers.push(event);
  }

  clearAnswers() {
    this.answers = [];
  }

  backToNode(nodeId: string) {
    const answerIdIndex = this.getAnswerIdIndex(nodeId);
    this.answers.splice(answerIdIndex, this.answers.length - answerIdIndex);
    this.backToNodeEvent.emit(answerIdIndex);
  }

  private getAnswerIdIndex(id: string): number {
    return this.answers.findIndex(answer => answer.questionId === id);
  }
}
