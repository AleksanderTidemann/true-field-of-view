import express from "express";
import Joi from "joi";

// app.post("/api/something", (req, res) => {
//   const { error, value } = inputValidation(req.body);
//   if (error) return res.status(400).send(error.details[0].message);
//
//   // ...
//   // ...
// });
//
// function inputValidation(course) {
//   const schema = {
//     name: Joi.string().min(3).required(),
//   };
//   return Joi.validate(course, schema);
// }
