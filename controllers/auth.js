import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

/* Register user*/
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body // deconstruct the request

    const salt = await bcrypt.genSalt()
    const passowrdHash = await bcrypt.hash(password, salt)
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passowrdHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 100),
      impressions: Math.floor(Math.random() * 1000),
    })
    const savedUser = await newUser.save() // saves a new user
    res.status(201).json(savedUser) // sends the user to the front end
  } catch (err) {
    res.status(500).json({ error: err.message }) //sends error sent by mongodb to the front end
  }
}

/* Logging in*/
export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    if (!user) return res.status(400).json({ msg: 'User does not exist' })

    const isMatch = await bcrypt.compare(password, user.passowrd)
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    delete user.passowrd
    res.status(200).json({ token, user })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
