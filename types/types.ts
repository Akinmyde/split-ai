export type Participant = {
  name: string;
  income: number;
  amount: number;
  debt: number;
};

export type SplitOptions = {
  label: string;
  value: SplitType;
};

export type SplitType =
  | "none"
  | "percentage"
  | "equal"
  | "income"
  | "expense"
  | "random"
  | "debt"
  | "custom";

export interface Percentages {
  [key: string]: number;
}

export interface Expenses {
  [key: string]: number;
}

export interface Debts {
  [key: string]: number;
}
