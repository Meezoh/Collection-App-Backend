import Tag from '../models/tag.js';

const latest = async (req, res) => {
  try {
    const tags = await Tag.find().sort({ _id: -1 }).limit(25);
    return res.status(200).json({ tags });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const autoComplete = async (req, res) => {
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

export { latest, autoComplete };
