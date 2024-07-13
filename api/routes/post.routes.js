// import express from 'express';
// import { verifyToken } from '../utils/verifyUser.js';

// import {create , getposts ,deletepost ,updatepost} from '../controllers/post.controller.js'

// const router = express.Router();

// router.post('/create', verifyToken, create);
// router.get('/getposts', getposts);
// router.delete('/deletepost/:postId/:userId', verifyToken, deletepost)
// router.put('/updatepost/:postId/:userId', verifyToken, updatepost)

// export default router;

import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {
  create,
  getposts,
  deletepost,
  updatepost,
  likePost,
  dislikePost,
  sharePost,
  favoritePost,
} from '../controllers/post.controller.js';

const router = express.Router();

router.post('/create', verifyToken, create);
router.get('/getposts', getposts);
router.delete('/deletepost/:postId/:userId', verifyToken, deletepost);
router.put('/updatepost/:postId/:userId', verifyToken, updatepost);

// New routes for like, dislike, share, and favorite
router.put('/like/:postId', verifyToken, likePost);
router.put('/dislike/:postId', verifyToken, dislikePost);
router.put('/share/:postId', verifyToken, sharePost);
router.put('/favorite/:postId', verifyToken, favoritePost);

export default router;


