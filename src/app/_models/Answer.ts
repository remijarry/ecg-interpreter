import { NodeId } from './node';

export interface Answer {
    label: string;
    nextNode: NodeId;
}

export enum AnswerType {
    Binary,
    Multiple,
    None
}