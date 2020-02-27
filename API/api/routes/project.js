const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

const Project = require("../models/project");
const Task = require("../models/Task");
const SubTask = require("../models/SubTask");


function search(query) {
    return function (element) {
        for (var i in query) {
            if (query[i] != element[i]) {
                return false;
            }
        }
        return true;
    }
}

exports.search = function (query) {
    return users.filter(search(query));
}

router.get('/', (req, res, next) => {
    if (req.query.search) {
        Project.find({ project_name: { $regex: ".*" + req.query.search + ".*", $options: 'i' } })
            .select()
            .exec()
            .then(docs => {
                const response = {
                    count: docs.length,
                    project: docs.map(doc => {
                        return {
                            project_name: doc.project_name,
                            project_president: doc.project_president,
                            project_faculty: doc.project_faculty,
                            project_branch: doc.project_branch,
                            project_budget: doc.project_budget,
                            project_telephone: doc.project_telephone,
                            project_status: doc.project_status,
                            project_admin: doc.project_admin,
                            img: doc.img,
                            date: doc.date,
                            _id: doc._id,
                            request: {
                                type: "GET",
                                url: "http:// localhost:4000/project/" + doc._id
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
        Project.find()
            .select()
            .exec()
            .then(docs => {
                const response = {
                    count: docs.length,
                    project: docs.map(doc => {
                        return {
                            project_name: doc.project_name,
                            project_president: doc.project_president,
                            project_faculty: doc.project_faculty,
                            project_branch: doc.project_branch,
                            project_budget: doc.project_budget,
                            project_telephone: doc.project_telephone,
                            project_status: doc.project_status,
                            project_admin: doc.project_admin,
                            date: doc.date,
                            img: doc.img,
                            _id: doc._id,
                            request: {
                                type: "GET",
                                url: "http:// localhost:4000/project/" + doc._id
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


// res.status(200).json(response.subtask.search(req.query.search));
router.post('/findSubTask_user/', (req, res, next) => {
    name = req.body.name
    SubTask.find({ sub_tank_leader: { $in: name } })
        .select()
        .populate('project_id')
        .exec()
        .then(docs => {
            const response = {
                project: docs.filter(doc => doc.project_id != null)
                    .map(doc => {
                        return {
                            project_name: doc.project_id.project_name,
                            project_president: doc.project_id.project_president,
                            project_faculty: doc.project_idproject_faculty,
                            project_branch: doc.project_id.project_branch,
                            project_budget: doc.project_id.project_budget,
                            project_telephone: doc.project_id.project_telephone,
                            project_status: doc.project_id.project_status,
                            project_admin: doc.project_id.project_admin,
                            img: doc.project_id.img,
                            date: doc.project_id.date,
                            _id: doc.project_id._id,
                            request: {
                                type: "GET",
                                url: "http:// localhost:4000/project/" + doc._id
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

router.post('/findTask_user/', (req, res, next) => {
    name = req.body.name

    Task.find({ tank_leader: { $in: name } })
        .select()
        .populate('project_id')
        .exec()
        .then(docs => {
            const response = {
                project: docs.filter(doc => doc.project_id != null)
                    .map(doc => {
                        return {
                            project_name: doc.project_id.project_name,
                            project_president: doc.project_id.project_president,
                            project_faculty: doc.project_idproject_faculty,
                            project_branch: doc.project_id.project_branch,
                            project_budget: doc.project_id.project_budget,
                            project_telephone: doc.project_id.project_telephone,
                            project_status: doc.project_id.project_status,
                            project_admin: doc.project_id.project_admin,
                            img: doc.project_id.img,
                            date: doc.project_id.date,
                            _id: doc.project_id._id,
                            request: {
                                type: "GET",
                                url: "http:// localhost:4000/project/" + doc._id
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

router.post('/', (req, res, next) => {
    const project = new Project({
        _id: new mongoose.Types.ObjectId(),
        project_name: req.body.project_name,
        project_president: req.body.project_president,
        project_faculty: req.body.project_faculty,
        project_branch: req.body.project_branch,
        project_budget: req.body.project_budget,
        project_telephone: req.body.project_telephone,
        project_status: req.body.project_status,
        project_admin: req.body.project_admin,
        date: req.body.date,

        // task : req.body.task
    });
    project
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Created project successfully",
                createdproject: {
                    project_name: result.project_name,
                    project_president: result.project_president,
                    project_faculty: result.project_faculty,
                    project_branch: result.project_branch,
                    project_budget: result.project_budget,
                    project_telephone: result.project_telephone,
                    project_status: result.project_status,
                    project_admin: result.project_admin,
                    img: result.img,
                    date: result.date,
                    _id: result._id,
                    //task : result.task,
                    request: {
                        type: 'GET',
                        url: "http:// localhost:4000/project/" + result._id
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

router.get('/:projectId', (req, res, next) => {
    const id = req.params.projectId;
    Project.findById(id)
        .select()
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json({
                    project: doc,
                    request: {
                        type: 'GET',
                        url: 'http:// localhost:4000/project'
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

router.post('/update/:projectId', (req, res, next) => {
    const id = req.params.projectId;
    const updateOps = {}
    for (const key of Object.keys(req.body)) {
        updateOps[key] = req.body[key]
    }
    Project.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Project updated',
                request: {
                    type: 'GET',
                    url: 'http:// localhost:4000/project' + id
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

router.patch('/:projectId', (req, res, next) => {
    const id = req.params.projectId;
    const updateOps = {}
    for (const key of Object.keys(req.body)) {
        updateOps[key] = req.body[key]
    }
    Project.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Project updated',
                request: {
                    type: 'GET',
                    url: 'http:// localhost:4000/project' + id
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

router.delete('/:projectId', (req, res, next) => {

    const id = req.params.projectId;
    Project.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Project deleted',
                request: {
                    type: 'POST',
                    url: 'http:// localhost:4000/project',

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

router.delete('/deleteTaskall/:projectId', (req, res, next) => {
    const id = req.params.projectId;
    Task.remove({ "project_id": { $in: [id] } })
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

router.delete('/deleteSubTaskall/:projectId', (req, res, next) => {
    const id = req.params.projectId;
    SubTask.remove({ "project_id": { $in: [id] } })
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


//{ $regex: ".*" + q + ".*", $options: 'i' }

router.post("/search", (req, res, next) => {

    Project.find({ project_name: { $regex: ".*" + req.query.search + ".*", $options: 'i' } })
        .select()
        .exec()
        .then(result => {
            return res.status(200).json({ result: result })
        }
        )
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});




router.get('/findall/:projectId', (req, res, next) => {
    const id = req.params.projectId;
    Task.find({ "project_id": { $in: [id] } })
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
                        _id: doc._id,
                        request: {
                            type: "GET",
                            url: "http:// localhost:4000/task/" + doc._id
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

router.get('/findall_sub/:projectId', (req, res, next) => {
    const id = req.params.projectId;
    SubTask.find({ "project_id": { $in: [id] } })
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
});

router.get('/findallDone/:projectId', (req, res, next) => {
    const id = req.params.projectId;
    Task.find({ "project_id": { $in: [id] }, "tank_status": { $in: ["Done"] } })
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
                        _id: doc._id,
                        request: {
                            type: "GET",
                            url: "http:// localhost:4000/task/" + doc._id
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







router.delete('', (req, res, next) => {
    Project.remove()
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Project deleted',
                request: {
                    type: 'POST',
                    url: 'http:// localhost:4000/project',

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


module.exports = router;