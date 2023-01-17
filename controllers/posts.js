import Post from '../models/Post.js'
import User from '../models/User.js'

/* Create */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body
    const user = await User.findById(userId)
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicutrePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    })
    await newPost.save()
    const post = await Post.find()
    res.status(201).json(post) // returns all the posts to the front end
  } catch (err) {
    res.status(409).json({ message: err.message })
  }
}

/* Read */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find()
    res.status(200).json(post) // returns all the posts to the front end
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params
    const post = await Post.find({ userId })
    res.status(200).json(post) // returns user posts to the front end
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

/* Update */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params
    const { userId } = req.body
    const post = await Post.findById(id)
    const isLiked = post.likes.get(userId) //gets the value for a given id in the map
    if (isLiked) {
      post.likes.delete(userId) // check if it already exists and remove that key value pair
    } else {
      post.likes.set(userId, true) // likes is a map, maps userId=> ture
    }
    //updates the post
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    )
    res.status(200).json(updatedPost) //sends the updated post to the front-end
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}
