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
    const {
      name,
      tag,
      optional1a,
      optional1b,
      optional1c,
      optional2a,
      optional2b,
      optional2c,
      optional3a,
      optional3b,
      optional3c,
      optional4a,
      optional4b,
      optional4c,
      optional5a,
      optional5b,
      optional5c,
    } = req.body;
    const newItem = await Item.create({
      name,
      tag,
      optional1a,
      optional1b,
      optional1c,
      optional2a,
      optional2b,
      optional2c,
      optional3a,
      optional3b,
      optional3c,
      optional4a,
      optional4b,
      optional4c,
      optional5a,
      optional5b,
      optional5c,
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

const updateItem = async (req, res) => {
  try {
    const { id: itemId } = req.params;
    const updatedItem = await Item.findOneAndUpdate({ _id: itemId }, req.body, {
      now: true,
      runValidator: true,
    });
    if (!updatedItem) {
      return res.status(404).json({ msg: `No Item with the id: ${id}` });
    }
    res.status(200).json({ msg: 'Item updated successfully', updatedItem });
  } catch (error) {
    res.status(500).json({ status: '500', msg: error });
  }
};

const deleteItem = async (req, res) => {
  try {
    const deletedItem = await Item.deleteMany({ selected: true });
    if (!deletedItem) res.status(404).json({ msg: 'No Item found' });
    res.status(200).json({ msg: 'Items deleted successfully', newItem: null });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const searchItem = async (req, res) => {
  try {
    const { searchInput } = req.query;
    const search = await Item.aggregate([
      {
        $search: {
          index: 'searchItems',
          text: {
            query: searchInput,
            path: {
              wildcard: '*',
            },
            fuzzy: {},
          },
        },
      },
    ]);
    res.status(200).json({ search });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export {
  allItems,
  setItem,
  kollectionItems,
  updateItem,
  deleteItem,
  searchItem,
};
