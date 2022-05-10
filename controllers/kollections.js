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

export { allKollections, setKollection, userKollections };
