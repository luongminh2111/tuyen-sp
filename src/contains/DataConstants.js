export const COLUMN_NAMES = {
  DO_IT: 'Do it',
  IN_PROGRESS: 'In Progress',
  AWAITING_REVIEW: 'Awaiting review',
  DONE: 'Done',
}

const {DO_IT} = COLUMN_NAMES;

export const tasks = [
    {id: 1, name: 'Item 1', column: DO_IT},
    {id: 2, name: 'Item 2', column: DO_IT},
    {id: 3, name: 'Item 3', column: DO_IT},
    {id: 4, name: 'Item 4', column: DO_IT},
];

export const logoPM = "https://firebasestorage.googleapis.com/v0/b/projectm-e1638.appspot.com/o/files%2FlogoPM.png?alt=media&token=6f94e305-c6c5-43a5-ad96-b7b218db1eb5";