const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

const Task = require("../models/Task");
const Project = require("../models/project");
const SubTask = require("../models/SubTask");
// { $or: [{ tank_leader: { $in: req.body.user_name } }, { tank_admin: req.body.user_name }] }
router.get('/', (req, res, next) => {
    console.log(req.body.user_name)
    if (req.query.search) {
        Task.find({ tank_name: { $regex: ".*" + req.query.search + ".*", $options: 'i' } })
            .select()
            .populate('project_id')
            .exec()
            .then(docs => {
                const response = {
                    count: docs.length,
                    task: docs.map(doc => {

                        return {
                            project_id: doc.project_id,
                            tank_leader: doc.tank_leader,
                            tank_explanation: doc.tank_explanation,
                            tank_faculty: doc.tank_faculty,
                            tank_branch: doc.tank_branch,
                            tank_budget: doc.tank_budget,
                            tank_telephone: doc.tank_telephone,
                            tank_status: doc.tank_status,
                            tank_name: doc.tank_name,
                            tank_admin: doc.tank_admin,
                            img: doc.img,
                            _id: doc._id,
                            request: {
                                type: "GET",
                                url: "http://localhost:4000/task/" + doc._id
                            }
                        };

                    })

                };


                res.status(200).json(response);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    } else {
        Task.find()
            .select()
            .populate('project_id')
            .exec()
            .then(docs => {
                const response = {
                    count: docs.length,
                    task: docs
                        .map(doc => {

                            return {

                                project_id: doc.project_id,
                                tank_leader: doc.tank_leader,
                                tank_explanation: doc.tank_explanation,
                                tank_faculty: doc.tank_faculty,
                                tank_branch: doc.tank_branch,
                                tank_budget: doc.tank_budget,
                                tank_telephone: doc.tank_telephone,
                                tank_status: doc.tank_status,
                                tank_name: doc.tank_name,
                                tank_admin: doc.tank_admin,
                                img: doc.img,
                                _id: doc._id,
                                request: {
                                    type: "GET",
                                    url: "http://localhost:4000/task/" + doc._id
                                }

                            };

                        })
                };


                res.status(200).json(response);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    }
});
router.post('/findSubTask_user/', (req, res, next) => {
    user_name = req.body.user_name
    console.log(name)
    SubTask.find({ sub_tank_leader: { $in: user_name } })
        .select()
        .populate('task_id')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                task: docs.filter(doc => doc.task_id != null)
                    .map(doc => {
                        return {
                            project_id: doc.task_id.project_id,
                            tank_leader: doc.task_id.tank_leader,
                            tank_explanation: doc.task_id.tank_explanation,
                            tank_faculty: doc.task_id.tank_faculty,
                            tank_branch: doc.task_id.tank_branch,
                            tank_budget: doc.task_id.tank_budget,
                            tank_telephone: doc.task_id.tank_telephone,
                            tank_status: doc.task_id.tank_status,
                            tank_name: doc.task_id.tank_name,
                            tank_admin: doc.task_id.tank_admin,
                            img: doc.task_id.img,
                            _id: doc.task_id._id,
                            request: {
                                type: "GET",
                                url: "http://localhost:4000/task/" + doc.task_id._id
                            }
                        };
                    })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });

});

router.post('/getdata_task', (req, res, next) => {
    console.log(req.body.user_name)
    if (req.query.search) {
        Task.find({ tank_name: { $regex: ".*" + req.query.search + ".*", $options: 'i' } })
            .select()
            .populate('project_id')
            .exec()
            .then(docs => {
                const response = {
                    count: docs.length,
                    task: docs.map(doc => {
                        let check_user = doc.tank_leader.find(o => o === req.body.user_name);
                        console.log(check_user)
                        if (doc.tank_admin == req.body.user_name || doc.project_id.project_president == req.body.user_name || check_user) {
                            return {
                                project_id: doc.project_id,
                                tank_leader: doc.tank_leader,
                                tank_explanation: doc.tank_explanation,
                                tank_faculty: doc.tank_faculty,
                                tank_branch: doc.tank_branch,
                                tank_budget: doc.tank_budget,
                                tank_telephone: doc.tank_telephone,
                                tank_status: doc.tank_status,
                                tank_name: doc.tank_name,
                                tank_admin: doc.tank_admin,
                                img: doc.img,
                                _id: doc._id,
                                request: {
                                    type: "GET",
                                    url: "http://localhost:4000/task/" + doc._id
                                }
                            };
                        }
                    })

                };
                const result = response.task.filter(a => a != null)
                const response_ex = {
                    count: result.length,
                    task: result
                }

                res.status(200).json(response_ex);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    } else {
        Task.find()
            .select()
            .populate('project_id')
            .exec()
            .then(docs => {
                const response = {
                    count: docs.length,
                    task: docs
                        .map(doc => {
                            let check_user = doc.tank_leader.find(o => o === req.body.user_name);
                            console.log(check_user)
                            if (doc.tank_admin == req.body.user_name || doc.project_id.project_president == req.body.user_name || check_user) {
                                return {

                                    project_id: doc.project_id,
                                    tank_leader: doc.tank_leader,
                                    tank_explanation: doc.tank_explanation,
                                    tank_faculty: doc.tank_faculty,
                                    tank_branch: doc.tank_branch,
                                    tank_budget: doc.tank_budget,
                                    tank_telephone: doc.tank_telephone,
                                    tank_status: doc.tank_status,
                                    tank_name: doc.tank_name,
                                    tank_admin: doc.tank_admin,
                                    img: doc.img,
                                    _id: doc._id,
                                    request: {
                                        type: "GET",
                                        url: "http://localhost:4000/task/" + doc._id
                                    }
                                };
                            }
                        })
                };
                const result = response.task.filter(a => a != null)
                const response_ex = {
                    count: result.length,
                    task: result
                }

                res.status(200).json(response_ex);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    }
});

router.post('/getdata_task_for_user', (req, res, next) => {

    if (req.query.search) {
        Task.find({ tank_name: { $regex: ".*" + req.query.search + ".*", $options: 'i' } })
            .select()
            .populate('project_id')
            .exec()
            .then(docs => {
                const response = {
                    count: docs.length,
                    task: docs.map(doc => {
                        let check_user = doc.tank_leader.find(o => o === req.body.user_name);

                        if (check_user) {

                            return {
                                project_id: doc.project_id,
                                tank_leader: doc.tank_leader,
                                tank_explanation: doc.tank_explanation,
                                tank_faculty: doc.tank_faculty,
                                tank_branch: doc.tank_branch,
                                tank_budget: doc.tank_budget,
                                tank_telephone: doc.tank_telephone,
                                tank_status: doc.tank_status,
                                tank_name: doc.tank_name,
                                tank_admin: doc.tank_admin,
                                img: doc.img,
                                _id: doc._id,
                                request: {
                                    type: "GET",
                                    url: "http://localhost:4000/task/" + doc._id
                                }
                            };
                        } else {
                            console.log('xxxxxxxx')
                        }
                    })

                };

                const result = response.task.filter(a => a != null)
                const response_ex = {
                    count: result.length,
                    task: result
                }

                res.status(200).json(response_ex);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    } else {
        Task.find()
            .select()
            .populate('project_id')
            .exec()
            .then(docs => {
                const response = {
                    count: docs.length,
                    task: docs
                        .map(doc => {
                            let check_user = doc.tank_leader.find(o => o === req.body.user_name);
                            console.log(check_user)
                            if (check_user) {
                                return {

                                    project_id: doc.project_id,
                                    tank_leader: doc.tank_leader,
                                    tank_explanation: doc.tank_explanation,
                                    tank_faculty: doc.tank_faculty,
                                    tank_branch: doc.tank_branch,
                                    tank_budget: doc.tank_budget,
                                    tank_telephone: doc.tank_telephone,
                                    tank_status: doc.tank_status,
                                    tank_name: doc.tank_name,
                                    tank_admin: doc.tank_admin,
                                    img: doc.img,
                                    _id: doc._id,
                                    request: {
                                        type: "GET",
                                        url: "http://localhost:4000/task/" + doc._id
                                    }
                                };
                            }
                        })
                };
                const result = response.task.filter(a => a != null)
                const response_ex = {
                    count: result.length,
                    task: result
                }

                res.status(200).json(response_ex);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    }
});







router.post('/getall', (req, res, next) => {
    Task.find()
        .select()
        .populate('project_id')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                task: docs
                    .map(doc => {



                        return {

                            project_id: doc.project_id,
                            tank_leader: doc.tank_leader,
                            tank_explanation: doc.tank_explanation,
                            tank_faculty: doc.tank_faculty,
                            tank_branch: doc.tank_branch,
                            tank_budget: doc.tank_budget,
                            tank_telephone: doc.tank_telephone,
                            tank_status: doc.tank_status,
                            tank_name: doc.tank_name,
                            tank_admin: doc.tank_admin,
                            img: doc.img,
                            _id: doc._id,
                            request: {
                                type: "GET",
                                url: "http://localhost:4000/task/" + doc._id
                            }
                        };

                    })
            };
            // const result = response.filter(a => a.task != null)
            //console.log(result)


            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});
router.post('/:projectId', (req, res, next) => {
    const id = req.params.projectId;

    Project.findById(id)
        .then(project => {
            if (!project) {
                return res.status(404).json({
                    message: "Project not found"
                });
            }
            const task = new Task({
                _id: new mongoose.Types.ObjectId(),
                tank_name: req.body.tank_name,
                project_id: req.body.project_id,
                tank_leader: req.body.tank_leader,
                tank_explanation: req.body.tank_explanation,
                tank_faculty: req.body.tank_faculty,
                tank_branch: req.body.tank_branch,
                tank_budget: req.body.tank_budget,
                tank_telephone: req.body.tank_telephone,
                tank_status: req.body.tank_status,
                tank_admin: req.body.tank_admin,
            });
            return task.save();
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Created Task successfully",
                createdtask: {
                    tank_name: result.tank_name,
                    project_id: result.project_id,
                    tank_leader: result.tank_leader,
                    tank_explanation: result.tank_explanation,
                    tank_faculty: result.tank_faculty,
                    tank_branch: result.tank_branch,
                    tank_budget: result.tank_budget,
                    tank_telephone: result.tank_telephone,
                    tank_status: result.tank_status,
                    tank_admin: result.tank_admin,
                    img: result.img,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: "http://localhost:4000/task/" + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:taskId', (req, res, next) => {
    const id = req.params.taskId;
    Task.findById(id)
        .select()
        .populate('project_id')
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json({
                    task: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:4000/task'
                    }
                });
            } else {
                res
                    .status(404)
                    .json({ message: "No valid entry found for provided ID" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.patch('/:taskId', (req, res, next) => {
    const id = req.params.taskId;
    const updateOps = {}
    for (const key of Object.keys(req.body)) {
        updateOps[key] = req.body[key]
    }
    Task.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Task updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/task' + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post('/update/:taskId', (req, res, next) => {
    const id = req.params.taskId;
    const updateOps = {}
    for (const key of Object.keys(req.body)) {
        updateOps[key] = req.body[key]
    }
    Task.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Task updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/Task' + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:taskId', (req, res, next) => {

    const id = req.params.taskId;
    Task.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Task deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:4000/task',

                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/deleteall/:taskId', (req, res, next) => {
    const id = req.params.taskId;
    SubTask.remove({ "task_id": { $in: [id] } })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

});

router.delete('/', (req, res, next) => {

    Task.remove()
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/findall/:taskId', (req, res, next) => {
    const id = req.params.taskId;
    SubTask.find({ "task_id": { $in: [id] } })
        .select()
        .populate('task_id')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                subtask: docs.map(doc => {
                    return {
                        subtank_name: doc.subtank_name,
                        project_id: doc.project_id,
                        task_id: doc.task_id,
                        sub_tank_leader: doc.sub_tank_leader,
                        sub_tank_explanation: doc.sub_tank_explanation,
                        sub_tank_faculty: doc.sub_tank_faculty,
                        sub_tank_branch: doc.sub_tank_branch,
                        sub_tank_budget: doc.sub_tank_budget,
                        sub_tank_telephone: doc.sub_tank_telephone,
                        sub_tank_comment: doc.sub_tank_comment,
                        sub_tank_status: doc.sub_tank_status,
                        sub_tank_admin: doc.sub_tank_admin,
                        img: doc.img,
                        _id: doc._id,
                        request: {
                            type: "GET",
                            url: "http://localhost:4000/subtask/" + doc._id
                        }
                    };
                })
            };

            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.get('/findallDone/:taskId', (req, res, next) => {
    const id = req.params.taskId;
    SubTask.find({ "task_id": { $in: [id] }, "sub_tank_status": { $in: ["Done"] } })
        .select()
        .populate('task_id')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                subtask: docs.map(doc => {
                    return {
                        subtank_name: doc.subtank_name,
                        project_id: doc.project_id,
                        task_id: doc.task_id,
                        sub_tank_leader: doc.sub_tank_leader,
                        sub_tank_explanation: doc.sub_tank_explanation,
                        sub_tank_faculty: doc.sub_tank_faculty,
                        sub_tank_branch: doc.sub_tank_branch,
                        sub_tank_budget: doc.sub_tank_budget,
                        sub_tank_telephone: doc.sub_tank_telephone,
                        sub_tank_comment: doc.sub_tank_comment,
                        sub_tank_status: doc.sub_tank_status,
                        sub_tank_admin: doc.sub_tank_admin,
                        img: doc.img,
                        _id: doc._id,
                        request: {
                            type: "GET",
                            url: "http://localhost:4000/subtask/" + doc._id
                        }
                    };
                })
            };

            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

module.exports = router;