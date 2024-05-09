export interface Post {
  id: number;
  title: string;
  username: string;
  content: string;
  image?: string;
  comments?: Comment[];
}

export interface Comment {
  username: string;
  content: string;
}
