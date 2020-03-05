// const express = require("express");
const User = require("../models/user");
const auth = require("basic-auth");
const Entry = require("../models/entry");

exports.auth = (req, res, next) => {
  const data = auth(req);
  if (!data) return next({ message: "Unauthorized", status: 401 });

  User.authenticate(data.name, data.pass, (err, user) => {
    if (user) {
      req.remoteUser = user;
    }
    next(err);
  });
};

exports.user = (req, res, next) => {
  User.get(req.params.id, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user.id) {
      res.status(404);
      return res.json({ error: "Not Found" });
    }
    res.json(user);
  });
};

exports.post = (req, res, next) => {
  const { title, body } = req.body;
  const { remoteUser } = req;
  if (title && body) {
    const entry = new Entry({ title, body, author: remoteUser.name });
    entry.save(err => {
      if (err) return next(err);
      res.status(201);
      res.json("Entry added");
    });
  } else {
    res.status(400);
    res.json("Bad request");
  }
};

exports.postLists = (req, res, next) => {
  const { pagination } = req;
  Entry.getRange(pagination.pageFrom, pagination.pageTo, (err, entries) => {
    if (err) return next(err);
    res.json(entries);
  });
};
