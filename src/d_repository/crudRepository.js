export default function crudRepository(model) {
  return {
    create: async function (data) {
      let newDoc = await model.create(data);
      return newDoc;
    },
    getAll: async function (limit, offset, populateOptions = [], query = {}) {
      console.log(query);
      const docs = await model
        .find({ ...query })
        .limit(limit)
        .skip(offset)
        .sort({ createdAt: -1 })
        .populate(populateOptions);

      return docs;
    },
    findById: async function (id, populateOptions) {
      let doc = await model.findById(id).populate(populateOptions);

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
