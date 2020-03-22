import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IDecisionTree, TreeNode, nodeList } from '../_models/node';
import { Answer, AnswerType } from '../_models/Answer';
import { AnsweredNode } from '../_models/answeredNode';

@Component({
  selector: 'app-decision-tree-form',
  templateUrl: './decision-tree-form.component.html',
  styleUrls: ['./decision-tree-form.component.css']
})
export class DecisionTreeFormComponent implements OnInit {
  public decisionTree: IDecisionTree;
  public currentNode: TreeNode;

  @Output() answerEvent = new EventEmitter<AnsweredNode>();

  constructor() {}

  ngOnInit() {
    this.reset();
  }

  /**
   * Initiate base node and tree.
   */
  public reset() {
    this.decisionTree = [];
    this.currentNode = Object.assign({}, nodeList.unstable);
  }

  onClick(answer: Answer) {
    const oldNode = this.currentNode;
    this.currentNode.decision = true;
    this.pushNode();
    this.currentNode = Object.assign({}, nodeList[answer.nextNode]);
    if (this.isFinal(this.currentNode)) {
      this.pushNode();
    }
    const answeredNode = new AnsweredNode(
      oldNode.id,
      this.currentNode.id,
      oldNode.question,
      answer.label
    );
    this.answerEvent.emit(answeredNode);
  }

  public isFinal(node: TreeNode): boolean {
    return node.answerType === AnswerType.None;
  }

  private pushNode(): void {
    this.decisionTree.push({
      node: this.currentNode,
      index: this.decisionTree.length
    });
  }

  public backToNode(nodeIndex: number) {
    const newNode = this.decisionTree.find(node => node.index === nodeIndex);
    this.decisionTree.length = nodeIndex;
    this.currentNode = Object.assign({}, nodeList[newNode.node.id]);
  }
}
