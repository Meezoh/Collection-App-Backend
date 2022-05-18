import Tag from '../models/tag.js';

const createTag = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { tag } = req.body;
    const newTag = new Tag({
      tag,
      inItem: itemId,
    });
    const theTag = await newTag.save();
    return res.status(200).res.json({ theTag });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const autoCompleteTag = async (req, res) => {
  try {
    const { term } = req.params;
    console.log(term);
    const autoComplete = await Tag.aggregate([
      {
        $search: {
          index: 'autoCompleteTag',
          autocomplete: {
            query: term,
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

export { createTag, autoCompleteTag };

// // This is used to locate all tags that belong to a certain item
// const searchTag = async (req, res) => {
//   try {
//     const { itemId } = req.params;
//     const tags = await Tag.find({ inItem: itemId });
//     return res.status(200).json({ tags });
//   } catch (error) {
//     return res.status(500).json({ msg: error });
//   }
// };
