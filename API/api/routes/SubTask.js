const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

const Task = require("../models/Task");
const Project = require("../models/project");
const SubTask = require("../models/SubTask");

router.get('/', (req, res, next) => {
    if (req.query.search) {
        SubTask.find({ subtank_name: { $regex: ".*" + req.query.search + ".*", $options: 'i' } })
            .select()
            .populate('project_id')
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
                                url: "http:// localhost:4000/subtask/" + doc._id
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
        SubTask.find()
            .select()
            .populate('project_id')
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
                                url: "http:// localhost:4000/subtask/" + doc._id
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

router.post('/getdata_subtask', (req, res, next) => {
    if (req.query.search) {
        SubTask.find({ subtank_name: { $regex: ".*" + req.query.search + ".*", $options: 'i' } })
            .select()
            .populate('project_id')
            .populate('task_id')
            .exec()
            .then(docs => {
                const response = {
                    count: docs.length,
                    subtask: docs.map(doc => {
                        let check_user_task = doc.task_id.tank_leader.find(o => o === req.body.user_name);
                        let check_user_subtask = doc.sub_tank_leader.find(o => o === req.body.user_name);
                        if (check_user_subtask || check_user_task || doc.sub_tank_admin == req.body.user_name) {
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
                                    url: "http:// localhost:4000/subtask/" + doc._id
                                }
                            };
                        }
                    })
                };
                const result = response.subtask.filter(a => a != null)
                const response_ex = {
                    count: result.length,
                    subtask: result
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
        SubTask.find()
            .select()
            .populate('project_id')
            .populate('task_id')
            .exec()
            .then(docs => {
                const response = {
                    count: docs.length,
                    subtask: docs.map(doc => {
                        let check_user_task = doc.task_id.tank_leader.find(o => o === req.body.user_name);
                        let check_user_subtask = doc.sub_tank_leader.find(o => o === req.body.user_name);
                        if (check_user_subtask || check_user_task || doc.sub_tank_admin == req.body.user_name) {
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
                                    url: "http:// localhost:4000/subtask/" + doc._id
                                }
                            };
                        }
                    })
                };
                const result = response.subtask.filter(a => a != null)
                const response_ex = {
                    count: result.length,
                    subtask: result
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

router.post('/getdata_subtask_for_user', (req, res, next) => {
    if (req.query.search) {
        SubTask.find({ subtank_name: { $regex: ".*" + req.query.search + ".*", $options: 'i' } })
            .select()
            .populate('project_id')
            .populate('task_id')
            .exec()
            .then(docs => {
                const response = {
                    count: docs.length,
                    subtask: docs.map(doc => {

                        let check_user_subtask = doc.sub_tank_leader.find(o => o === req.body.user_name);
                        if (check_user_subtask) {
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
                                    url: "http:// localhost:4000/subtask/" + doc._id
                                }
                            };
                        }
                    })
                };
                const result = response.subtask.filter(a => a != null)
                const response_ex = {
                    count: result.length,
                    subtask: result
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
        SubTask.find()
            .select()
            .populate('project_id')
            .populate('task_id')
            .exec()
            .then(docs => {
                const response = {
                    count: docs.length,
                    subtask: docs.map(doc => {

                        let check_user_subtask = doc.sub_tank_leader.find(o => o === req.body.user_name);
                        if (check_user_subtask) {
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
                                    url: "http:// localhost:4000/subtask/" + doc._id
                                }
                            };
                        }
                    })
                };
                const result = response.subtask.filter(a => a != null)
                const response_ex = {
                    count: result.length,
                    subtask: result
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



router.post('/', (req, res, next) => {
    Task.findById(req.body.task_id)
        .then(task => {
            if (!task) {
                return res.status(404).json({
                    message: "Task not found"
                });
            }
            const subtask = new SubTask({
                _id: new mongoose.Types.ObjectId(),
                subtank_name: req.body.subtank_name,
                project_id: req.body.project_id,
                task_id: req.body.task_id,
                sub_tank_leader: req.body.sub_tank_leader,
                sub_tank_explanation: req.body.sub_tank_explanation,
                sub_tank_faculty: req.body.sub_tank_faculty,
                sub_tank_branch: req.body.sub_tank_branch,
                sub_tank_budget: req.body.sub_tank_budget,
                sub_tank_telephone: req.body.sub_tank_telephone,
                sub_tank_comment: req.body.sub_tank_comment,
                sub_tank_status: req.body.sub_tank_status,
                sub_tank_admin: req.body.sub_tank_admin,
            });
            return subtask.save();
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Created SubTask successfully",
                createsubtask: {
                    subtank_name: result.subtank_name,
                    project_id: result.project_id,
                    task_id: result.task_id,
                    sub_tank_leader: result.sub_tank_leader,
                    sub_tank_explanation: result.sub_tank_explanation,
                    sub_tank_faculty: result.sub_tank_faculty,
                    sub_tank_branch: result.sub_tank_branch,
                    sub_tank_budget: result.sub_tank_budget,
                    sub_tank_telephone: result.sub_tank_telephone,
                    sub_tank_comment: result.sub_tank_comment,
                    sub_tank_status: result.sub_tank_status,
                    sub_tank_admin: result.sub_tank_admin,
                    img: result.img,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: "http:// localhost:4000/subtask/" + result._id
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

router.get('/:subtaskId', (req, res, next) => {
    const id = req.params.subtaskId;
    SubTask.findById(id)
        .select()
        .populate('project_id')
        .populate('task_id')
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json({
                    subtask: doc,
                    request: {
                        type: 'GET',
                        url: 'http:// localhost:4000/subtask'
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
router.post('/update/:subtaskId', (req, res, next) => {
    const id = req.params.subtaskId;
    const updateOps = {}
    for (const key of Object.keys(req.body)) {
        updateOps[key] = req.body[key]
    }
    SubTask.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Sub Task updated',
                request: {
                    type: 'GET',
                    url: 'http:// localhost:4000/Task' + id
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
router.patch('/:subtaskId', (req, res, next) => {
    const id = req.params.subtaskId;
    const updateOps = {}
    for (const key of Object.keys(req.body)) {
        updateOps[key] = req.body[key]
    }
    SubTask.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'SubTask updated',
                request: {
                    type: 'GET',
                    url: 'http:// localhost:4000/subtask' + id
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

router.delete('/:subtaskId', (req, res, next) => {

    const id = req.params.subtaskId;
    SubTask.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'SubTask deleted',
                request: {
                    type: 'POST',
                    url: 'http:// localhost:4000/subtask',

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

router.delete('/', (req, res, next) => {

    SubTask.remove()
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


module.exports = router;