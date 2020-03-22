import { AnswerType, Answer } from './Answer';

export type IDecisionTree = Array<IIndexedTreeNode>;

export interface IIndexedTreeNode {
  node: TreeNode;
  index: number;
}

export class TreeNode {
  public decision?: boolean;
  constructor(
    public readonly id: NodeId,
    public readonly question: string,
    public readonly description: string[], // todo: make it into a list of strings.
    public readonly answerType: AnswerType,
    public readonly answers: Array<Answer>
  ) {}
}

/**
 * Possible values for a node id.
 */
export type NodeId =
  | 'unstable'
  | 'codeblue'
  | 'wideqrs'
  | 'vt'
  | 'regularqrscomplex'
  | 'svt'
  | 'pwaves'
  | 'atrialflutter'
  | 'atrialfibrilation';

/**
 * Dictionary of nodes by their id.
 */
export const nodeList = {
  unstable: new TreeNode(
    'unstable',
    'Unstable?',
    [
      'BP < 90 Systolic',
      'decreased LOC',
      'new onset',
      'rate related chest pain'
    ],
    AnswerType.Binary,
    [
      { label: 'Yes', nextNode: 'codeblue' },
      { label: 'No', nextNode: 'wideqrs' }
    ]
  ),
  codeblue: new TreeNode(
    'codeblue',
    '',
    [
      'Immediate synchronised cardioversion 50-100 j',
      'Consider and correct: Hypoxia',
      'Hypovolaemia, Hyper / Hypokalaemia / metabolic state, Hypo / Hyperthermia',
      'Tension Pneumothorax',
      'Tamponade (cardiac)',
      'Toxins, Thrombus (pulmonary) / cardiac.'
    ],
    AnswerType.None,
    []
  ),
  wideqrs: new TreeNode(
    'wideqrs',
    'Wide QRS ?',
    ['More than 0.12sec or 3 small squares'],
    AnswerType.Binary,
    [
      { label: 'Yes', nextNode: 'vt' },
      { label: 'No', nextNode: 'regularqrscomplex' }
    ]
  ),
  vt: new TreeNode(
    'vt',
    '',
    [
      'Give Amiodarone',
      'If torsades de pointes, give magnesium: 5mmol over 10-20min',
      'Repeat 5 mmol over 10-20min'
    ],
    AnswerType.None,
    []
  ),
  regularqrscomplex: new TreeNode(
    'regularqrscomplex',
    'Regular QRS complexes ?',
    [],
    AnswerType.Binary,
    [
      { label: 'Yes', nextNode: 'svt' },
      { label: 'No', nextNode: 'pwaves' }
    ]
  ),
  svt: new TreeNode(
    'svt',
    '',
    [
      'Attempt vagal manoeuvres',
      'Adenosine 6mg IV',
      'If no conversion, Adenosine 12mg',
      'If no conversion, Adenosine 12mg IV',
      'Obtain expert consultation'
    ],
    AnswerType.None,
    []
  ),
  pwaves: new TreeNode('pwaves', 'Pwaves present ?', [], AnswerType.Binary, [
    { label: 'Yes', nextNode: 'atrialflutter' },
    { label: 'No', nextNode: 'atrialfibrilation' }
  ]),
  atrialflutter: new TreeNode(
    'atrialflutter',
    '',
    [' Atrial flutter TODO'],
    AnswerType.None,
    []
  ),
  atrialfibrilation: new TreeNode(
    'atrialfibrilation',
    '',
    [
      'Consider volumes  status',
      'sepsis',
      'pain',
      'CP',
      'HF',
      'MI',
      'PE',
      'bleeding / anemia, electrolytes',
      'Investigations: FBC UEC, VBG, PE'
    ],
    AnswerType.None,
    []
  )
};
