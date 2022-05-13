import Kollection from '../models/kollection';

const allKollections = async (req, res) => {
  try {
    const kollections = await Kollection.find({});
    res.status(200).json({ kollections });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const setKollection = async (req, res) => {
  try {
    const { name, description, topic, userId } = req.body;
    const newKollection = await Kollection.create({
      name,
      description,
      topic,
      userId,
    });
    res.status(200).json({ newKollection });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const userKollections = async (req, res) => {
  try {
    const { userId } = req.params;
    const kollections = await Kollection.find({ userId });
    res.status(200).json({ kollections });
  } catch (error) {
    res.status(500).json({ msg: error });
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
    res
      .status(200)
      .json({ msg: 'User updated successfully', updatedKollection });
  } catch (error) {
    res.status(500).json({ status: '500', msg: error });
  }
};

const deleteKollection = async (req, res) => {
  try {
    const deletedKollection = await Kollection.deleteMany({ selected: true });
    if (!deletedKollection)
      res.status(404).json({ msg: 'No kollection found' });
    res
      .status(200)
      .json({ msg: 'Kollections deleted successfully', newKollection: null });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export {
  allKollections,
  setKollection,
  userKollections,
  updateKollection,
  deleteKollection,
};
