import express from "express";

const router = express.Router();

/**
 * Import child routes.
 */
import authRoutes from "./api-auth.js";
router.use("/auth", authRoutes);

import userRoutes from "./api-users.js";
router.use("/users", userRoutes);

import articlesRoutes from "./api-articles.js";
router.use("/articles", articlesRoutes);

import usersArticlesRoutes from "./api-users-articles.js";
router.use("/users/articles", usersArticlesRoutes);

import usersCommentsRoutes from "./api-users-comments.js";
router.use("/users/comments", usersCommentsRoutes);

export default router;
