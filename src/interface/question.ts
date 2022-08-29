export interface Question {
  id: number;
  text: string;
  type: string;
  options?: string[];
  creationDate: string;
  isOpen: boolean;
  answer: string;
  your_answer?: string[];
}
