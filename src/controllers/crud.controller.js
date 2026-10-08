export function createCrudController(Model, label) {
    return {
        create: async (req, res) => {
            const record = await Model.create(req.body);
            res.status(201).json(record);
        },
        update: async (req, res) => {
            const record = await Model.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
            });
            if (!record) return res.status(404).json({ message: `${label} not found` });
            res.json(record);
        },
        remove: async (req, res) => {
            const record = await Model.findByIdAndDelete(req.params.id);
            if (!record) return res.status(404).json({ message: `${label} not found` });
            res.status(204).send();
        },
    };
}
