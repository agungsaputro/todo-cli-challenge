const todo = require('../models/index')

exports.get = async (req, res) => {
	try {
		const dataTasks = await task.findAll();
		res.status(200).json({
			message: 'success retrieve data',
			status: true,
			data: dataTasks
		});
	} catch (error) {
		res.status(500).json({
			message: 'failed',
			status: false,
			data: error
		});
	}
};

exports.post = async (req, res) => {
	const dataTask = req.body;
	try {
		await task.create(dataTask);
		res.status(200).json({
			message: 'success add new task',
			status: true
		});
	} catch (error) {
		res.status(500).json({
			message: 'failed',
			status: false,
			data: error
		});
	}
};

exports.put = async (req, res) => {
	const taskId = req.params.id;
	const dataTask = req.body;

	try {
		const cekTask = await task.findOne({ where: { id: taskId } });
		if (cekTask) {
            await task.update(dataTask,{ where: { id: taskId } })
            res.status(200).json({
                message: 'success update task',
                status: true
            });
		} else {
            res.status(404).json({
                message: 'task is not found',
                status: false
            });
		}
	} catch (error) {
        res.status(500).json({
			message: 'failed',
			status: false,
			data: error
		});
    }
};

exports.delete = async (req, res) => {
    const taskId = req.params.id;

	try {
		const cekTask = await task.findOne({ where: { id: taskId } });
		if (cekTask) {
            await task.destroy({ where: { id: taskId } })
            res.status(200).json({
                message: 'success Delete task',
                status: true
            });
		} else {
            res.status(404).json({
                message: 'task is not found',
                status: false
            });
		}
	} catch (error) {
        res.status(500).json({
			message: 'failed',
			status: false,
			data: error
		});
    }
};

exports.getById = async (req, res) => {
    const taskId = req.params.id;
	try {
		const dataTask = await task.findOne({ where: { id: taskId } });
		if (dataTask) {
            res.status(200).json({
                message: 'success retrieve data',
                status: true,
                data: dataTask
            });
		} else {
            res.status(404).json({
                message: 'task is not found',
                status: false
            });
		}
	} catch (error) {
        res.status(500).json({
			message: 'failed',
			status: false,
			data: error
		});
    }
};
