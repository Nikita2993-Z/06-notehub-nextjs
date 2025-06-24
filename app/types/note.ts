export interface Note {
  createdAt: string | number | Date;
  id: number;
  title: string;
  content: string;
  tag: "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";
}