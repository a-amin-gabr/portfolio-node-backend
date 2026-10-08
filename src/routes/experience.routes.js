import {Router} from "express";
import {getExperiences} from "../controllers/experience.controller.js";
import { Experience } from "../models/experience.js";
import { createCrudController } from "../controllers/crud.controller.js";

const router = Router();

router.get('/', getExperiences)
const crud = createCrudController(Experience, 'Experience');
router.post('/', crud.create);
router.put('/:id', crud.update);
router.delete('/:id', crud.remove);

export default router;