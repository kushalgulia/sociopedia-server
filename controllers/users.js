import User from '../models/User'

/* Read */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    res.status(200).json(user) // send the found user to the front end
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}
