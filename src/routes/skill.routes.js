import {Router} from "express";
import { getSkills } from "../controllers/skill.controller.js";
import { Skill } from "../models/skill.js";
import { createCrudController } from "../controllers/crud.controller.js";

const router = Router();

router.get('/', getSkills)
const crud = createCrudController(Skill, 'Skill');
router.post('/', crud.create);
router.put('/:id', crud.update);
router.delete('/:id', crud.remove);

export default router;