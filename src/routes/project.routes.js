import {Router} from "express";
import {getProjects} from "../controllers/project.controller.js";
import { Project } from "../models/project.js";
import { createCrudController } from "../controllers/crud.controller.js";

const router = Router();

router.get('/', getProjects)
const crud = createCrudController(Project, 'Project');
router.post('/', crud.create);
router.put('/:id', crud.update);
router.delete('/:id', crud.remove);

export default router;