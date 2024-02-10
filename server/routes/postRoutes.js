
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");
const postRouter = express.Router();

const postModel = require("../models/postModel");
postRouter.get("/", auth, async (req, res) => {
    try {
        const data = await postModel.find();
        console.log(data);
        res.status(200).send(data);
    } catch (error) {
        res.send({ err: error });
    }
});
postRouter.delete("/delete/:id", auth, async (req, res) => {
    try {
        const id = req.params.id;
        const reqId = req.payload.id;
        const data = await postModel.findById(reqId);
        console.log(data.id, id);
        if (data.id == id) {
            const data = await postModel.findByIdAndDelete(id);
        res.send({ message: "deleted successfully", data: data });
        }
    } catch (error) {
        res.send({ err: error, message: error.message });
    }
});
postRouter.post("/add", auth, async (req, res) => {
    const id = req.payload.id;
    const {  title, body, device } = req.body;
    console.log(req.body);
    try {
        const data = new postModel({ body, id: id, title, device });
        await data
            .save()
            .then(() => {
                res.send({ message: "added successfully", data: data });
            })
            .catch((err) => {
                res.send({ err: err.message });
            });
    } catch (error) {
        res.send({ err: error, message: error.message });
    }
});
postRouter.patch("/patch/:id", auth, async (req, res) => {
    try {
        const id = req.payload.id;
        const reqId = req.params.id;
        const data = await postModel.findById(reqId);
        console.log(data.id, id);
        if (data.id == id) {
            const data = await postModel.findByIdAndUpdate(reqId, req.body);
            res.send({ message: "updated successfully", data: data });
        }
    } catch (error) {
        res.send({ err: error, message: error.message });
    }
});
module.exports = postRouter;