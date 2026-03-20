export interface Advertisement {
  id: string;
  name: string;
  description: string;
  price: number;
  date: Date;
  author: string;
  pictures: string[];
  comments: Comment[];
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  date: Date;
}