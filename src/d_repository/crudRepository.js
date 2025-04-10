export default function crudRepository(model) {
  return {
    create: async function (data) {
      const newDoc = await model.create(data);
      return newDoc;
    },
    getAll: async function (limit, offset, populateOptions = []) {
      const docs = await model
        .find({})
        .limit(limit)
        .skip(offset)
        .sort({ updatedAt: -1 })
        .populate(populateOptions);

      return docs;
    },
    findById: async function (id) {
      const doc = await model.findById(id);
      return doc;
    },
    delete: async function (id) {
      const response = await model.findByIdAndDelete(id);
      return response;
    },
    deleteMany: async (ids) => {
      const response = await model.deleteMany({ _id: { $in: ids } });
      return response;
    },
    update: async function (id, data) {
      const updatedObj = await model.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true }
      );

      return updatedObj;
    }
  };
}
