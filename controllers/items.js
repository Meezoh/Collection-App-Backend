import Item from '../models/item.js';

const allItems = async (req, res) => {
  try {
    const items = await Item.find()
      .populate('createdBy', '_id name')
      .populate('inKollection', '_id')
      .sort('-createdAt');
    return res.status(200).json({ items });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

// This is the Tag cloud.
const allItemsByTag = async (req, res) => {
  try {
    const { tag } = req.params;
    const items = await Item.find({ tag });
    return res.status(200).json({ items });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const searchItem = async (req, res) => {
  try {
    const { term } = req.params;
    const search = await Item.aggregate([
      {
        $search: {
          index: 'nameIndex',
          text: {
            query: term,
            path: ['name', 'comments.text'],
            fuzzy: {},
          },
        },
      },
    ]);
    return res.status(200).json({ search });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const createItem = async (req, res) => {
  try {
    const { kollectionId } = req.params;
    const { name } = req.body;
    const item = new Item({
      name,
      createdBy: req.user,
      inKollection: kollectionId,
    });
    const newItem = await item.save();
    return res.status(200).json({ newItem });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const createTag = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { tag } = req.body;
    const updateTag = Item.findByIdAndUpdate(
      itemId,
      {
        $push: { tag },
      },
      { new: true }
    );
    const newTag = await updateTag;
    return res.status(200).json({ newTag });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const kollectionItems = async (req, res) => {
  try {
    const { kollectionId } = req.body;
    const items = await Item.find({ kollectionId });
    return res.status(200).json({ items });
  } catch (error) {
    return res.status(500).json({ msg: error });
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
    } else {
      return res
        .status(200)
        .json({ msg: 'Item updated successfully', updatedItem });
    }
  } catch (error) {
    return res.status(500).json({ status: '500', msg: error });
  }
};

const deleteItem = async (req, res) => {
  try {
    const deletedItem = await Item.deleteMany({ selected: true });
    if (!deletedItem) res.status(404).json({ msg: 'No Item found' });
    return res
      .status(200)
      .json({ msg: 'Items deleted successfully', newItem: null });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const like = (req, res) => {
  const { itemId } = req.body;
  Item.findByIdAndUpdate(
    itemId,
    {
      $push: { likes: req.user._id },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    } else {
      return res.json(result);
    }
  });
};

const comment = (req, res) => {
  const { id: itemId } = req.body;
  const comment = {
    text: req.body.text,
    createdBy: req.user._id,
  };
  Item.findByIdAndUpdate(
    itemId,
    {
      $push: { comments: comment },
    },
    {
      new: true,
    }
  )
    .populate('comments.createdBy', '_id name')
    .populate('createdBy', '_id name')
    .exec((err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      } else {
        return res.status(200).json(result);
      }
    });
};

export {
  allItems,
  searchItem,
  allItemsByTag,
  createItem,
  createTag,
  kollectionItems,
  updateItem,
  deleteItem,
  like,
  comment,
};
