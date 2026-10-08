import {Router} from "express";
import {getProfileInfo} from "../controllers/profile.controller.js";
import { Profile } from "../models/profile.js";
import { createCrudController } from "../controllers/crud.controller.js";

const router = Router();

router.get('/', getProfileInfo)
const crud = createCrudController(Profile, 'Profile');
router.post('/', crud.create);
router.put('/:id', crud.update);
router.delete('/:id', crud.remove);

export default router;