import User from '../models/user.js';

const allUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ msg: error });
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
    return res
      .status(200)
      .json({ msg: 'User updated successfully', updatedUser });
  } catch (error) {
    return res.status(500).json({ status: '500', msg: error });
  }
};

const deleteUsers = async (req, res) => {
  try {
    const deletedUsers = await User.deleteMany({ selected: true });
    if (!deletedUsers) res.status(404).json({ msg: 'No user found' });
    return res
      .status(200)
      .json({ msg: 'Users deleted successfully', user: null });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

export { allUsers, updateUser, deleteUsers };
