import express from 'express'
import { getFeedPosts, getUserPosts, likePost } from '../controllers/posts.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

/* Read */
router.get('/', verifyToken, getFeedPosts) //sending all the posts
router.get('/:userId/posts', verifyToken, getUserPosts) //sending all the user posts

/* Update */
router.patch('/:id/like', verifyToken, likePost) // liking and unliking posts

export default router
