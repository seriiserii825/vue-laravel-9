import {ICategoryResponse} from "../api/ICategoryResponse.ts";
import {IPost} from "./IPost.ts";

export interface Ihome {
    categories: ICategoryResponse[];
    posts: IPost[];
  }
