import Item from '../models/item';

const allItems = async (req, res) => {
  try {
    const items = await Item.find({});
    res.status(200).json({ items });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export default allItems;
