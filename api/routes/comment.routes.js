// import express from 'express';
// import { verifyToken } from '../utils/verifyUser.js';
// import { createComment ,getPostComments,likeComment,editComment ,deleteComment,getcomments } from '../controllers/comment.controller.js';

// const router = express.Router();


// router.post('/create', verifyToken, createComment);
// router.get('/getPostComments/:postId', getPostComments);
// router.put('/likeComment/:commentId', verifyToken, likeComment);
// router.put('/editComment/:commentId', verifyToken, editComment);
// router.delete('/deleteComment/:commentId', verifyToken, deleteComment);
// router.get('/getcomments', verifyToken, getcomments);


// export default router;



import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { 
  createComment,
  getPostComments,
  likeComment,
  editComment,
  deleteComment,
  getComments 
} from '../controllers/comment.controller.js';

const router = express.Router();

// Create a new comment
router.post('/create', verifyToken, createComment);

// Get all comments for a specific post
router.get('/getPostComments/:postId', getPostComments);

// Like or unlike a comment
router.put('/likeComment/:commentId', verifyToken, likeComment);

// Edit a comment
router.put('/editComment/:commentId', verifyToken, editComment);

// Delete a comment
router.delete('/deleteComment/:commentId', verifyToken, deleteComment);

// Get all comments with pagination and statistics
router.get('/getComments', verifyToken, getComments);

export default router;
