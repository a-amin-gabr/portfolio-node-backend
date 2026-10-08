import {Router} from "express";
import {getCertificates} from "../controllers/certificate.controller.js";
import { Certificate } from "../models/certificate.js";
import { createCrudController } from "../controllers/crud.controller.js";

const router = Router();

router.get('/', getCertificates)
const crud = createCrudController(Certificate, 'Certificate');
router.post('/', crud.create);
router.put('/:id', crud.update);
router.delete('/:id', crud.remove);

export default router;