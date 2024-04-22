export interface Comment {
  user: string;
  content: string;
}

export interface Post {
  title: string;
  user: string;
  content: string;
  image: string;
  comments: Comment[];
}
