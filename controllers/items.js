import Item from '../models/item';

const allItems = async (req, res) => {
  try {
    const items = await Item.find({});
    res.status(200).json({ items });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const setItem = async (req, res) => {
  try {
    const { name, tag, optional2a, optional2b, kollectionId } = req.body;
    const newItem = await Item.create({
      name,
      tag,
      optional2a,
      optional2b,
      kollectionId,
    });
    res.status(200).json({ newItem });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const kollectionItems = async (req, res) => {
  try {
    const { kollectionId } = req.params;
    const items = await Item.find({ kollectionId });
    res.status(200).json({ items });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export { allItems, setItem, kollectionItems };
