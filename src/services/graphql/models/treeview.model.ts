export type TreeViewModel<T> = {
  id: string;
  name: string;
  type: string;
  children: TreeViewModel<T>[];
  data?: T;
};
