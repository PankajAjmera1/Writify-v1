// import mongoose from 'mongoose';
// import {Schema} from 'mongoose';

// const postSchema =new Schema({

//     userId: {
//         type: String,
//         required: true,
//       },
//       content: {
//         type: String,
//         required: true,
//       },
//       title: {
//         type: String,
//         required: true,
//         unique: true,
//       },
//       image: {
//         type: String,
//         default: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
       
//       },
//       category: {
//         type: String,
//         default: 'uncategorized',
//       },
//       slug: {
//         type: String,
//         required: true,
//         unique: true,
//       },

// },{timestamps:true})

// export const Post =mongoose.model('Post',postSchema)
// export default Post;

import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const postSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    default: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  category: {
    type: String,
    default: 'uncategorized',
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  likes: {
    type: [String], // array of user IDs who liked the post
    default: [],
  },
  dislikes: {
    type: [String], // array of user IDs who disliked the post
    default: [],
  },
  shares: {
    type: Number,
    default: 0,
  },
  favorites: {
    type: [String], // array of user IDs who favorited the post
    default: [],
  },
}, { timestamps: true });

export const Post = mongoose.model('Post', postSchema);
export default Post;

