import { NodeId } from './node';

export class AnsweredNode {
  questionId: NodeId;
  questionLabel: string;
  pickedAnswerLabel: string;
  nextQuestionId: NodeId;

  constructor(questionId: NodeId, nextQuestionId: NodeId, questionLabel: string, pickedAnswerLabel: string) {
    this.questionId = questionId;
    this.nextQuestionId = nextQuestionId;
    this.questionLabel = questionLabel;
    this.pickedAnswerLabel = pickedAnswerLabel;
  }
}
