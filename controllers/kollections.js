import Kollection from '../models/kollection.js';

const allKollections = async (req, res) => {
  try {
    const kollections = await Kollection.find()
      .populate('postedBy', '_id name')
      .sort({ _id: -1 });

    return res.status(200).json({ kollections });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const createKollection = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, description, topic, image } = req.body;

    const kollection = await Kollection.create({
      name,
      description,
      topic,
      image,
      postedBy: userId,
    });

    return res.status(200).json({ kollection });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const userKollections = async (req, res) => {
  try {
    const { userId } = req.params;
    const kollections = await Kollection.find({ postedBy: userId }).sort({
      _id: -1,
    });
    return res.status(200).json({ kollections });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const updateKollection = async (req, res) => {
  try {
    const { id: kollectionId } = req.params;
    const updatedKollection = await Kollection.findOneAndUpdate(
      { _id: kollectionId },
      req.body,
      {
        now: true,
        runValidator: true,
      }
    );
    if (!updatedKollection) {
      return res.status(404).json({ msg: `No user with the id: ${id}` });
    }
    return res
      .status(200)
      .json({ msg: 'User updated successfully', updatedKollection });
  } catch (error) {
    res.status(500).json({ status: '500', msg: error });
  }
};

const deleteKollection = async (req, res) => {
  try {
    const deletedKollection = await Kollection.deleteMany({ selected: true });
    if (!deletedKollection) {
      return res.status(404).json({ msg: 'No kollection found' });
    } else {
      return res
        .status(200)
        .json({ msg: 'Kollections deleted successfully', newKollection: null });
    }
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

export {
  allKollections,
  createKollection,
  userKollections,
  updateKollection,
  deleteKollection,
};
