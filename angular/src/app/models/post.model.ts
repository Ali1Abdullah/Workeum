import { Main } from './main.model';


export interface PostType {
   id: number;
   title: string;
   author: string;
}

export class Post extends Main implements PostType {
   public id: number;
   public title: string;
   public author: string;


   constructor(post: PostType) {
      super(post);
      this.title = post.title;
      this.author = post.author

   }
}