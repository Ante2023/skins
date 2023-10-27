import { Router } from "express";

import { register, login, logout } from "../controllers/auth.controller.js";
import { validateSchema } from "../middleware/validator.middleware.js";

import { schema } from "../schemas/auth.schema.js";
const router = Router();

// http://localhost:4000/auth/register
router.post("/register", validateSchema(schema), register);

// http://localhost:4000/auth/login
router.post("/login", validateSchema(schema), login);

// http://localhost:4000/auth/logout
router.post("/logout", logout);

export default router;
