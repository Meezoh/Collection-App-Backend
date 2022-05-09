import User from '../models/user';

const allUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const updatedUser = await User.findOneAndUpdate({ _id: userId }, req.body, {
      now: true,
      runValidator: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ msg: `No user with the id: ${id}` });
    }
    res.status(200).json({ msg: 'User updated successfully', updatedUser });
  } catch (error) {
    res.status(500).json({ status: '500', msg: error });
  }
};

export default allUsers;
