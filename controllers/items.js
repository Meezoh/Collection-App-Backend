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
    const { input } = req.body;
    const search = await Item.aggregate([
      {
        $search: {
          index: 'nameIndex',
          text: {
            query: input,
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

const autoCompleteTag = async (req, res) => {
  try {
    const { input } = req.body;
    const autoComplete = await Item.aggregate([
      {
        $search: {
          index: 'autoCompleteTags',
          autocomplete: {
            query: input,
            path: 'tag',
            tokenOrder: 'sequential',
          },
        },
      },
      {
        $limit: 10,
      },
      {
        $project: {
          name: 1,
          tag: 1,
        },
      },
    ]);
    return res.status(200).json({ autoComplete });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const createItem = async (req, res) => {
  try {
    const { kollectionId } = req.params;
    const { name, tag } = req.body;
    const item = new Item({
      name,
      tag,
      // TODO: test and see if the "createdBy" can be retrieved from req.user using the frontend
      createdBy: req.user,
      inKollection: kollectionId,
    });
    const newItem = await item.save();

    return res.status(200).json({ newItem });
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
        return res.json(result);
      }
    });
};

export {
  allItems,
  searchItem,
  allItemsByTag,
  autoCompleteTag,
  createItem,
  kollectionItems,
  updateItem,
  deleteItem,
  like,
  comment,
};
