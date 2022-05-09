import Kollection from '../models/kollection';

const allKollections = async (req, res) => {
  try {
    const kollections = await Kollection.find({});
    res.status(200).json({ kollections });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export default allKollections;
