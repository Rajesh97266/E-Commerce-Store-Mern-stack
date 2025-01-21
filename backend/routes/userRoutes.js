import express from "express";
import {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserByID,
  getUserByID,
  updateUserByID,
} from "../controllers/userController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(createUser)
  .get(authenticate, authorizeAdmin, getAllUsers);
router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);

router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateCurrentUserProfile);

//Admin Routes

router.route("/:id").delete(authenticate, authorizeAdmin, deleteUserByID).get(
  authenticate,
  authorizeAdmin,
  getUserByID
).put(authenticate, authorizeAdmin, updateUserByID);

export default router;
