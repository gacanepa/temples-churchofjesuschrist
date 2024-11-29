import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../swagger-output.json' with {type: "json"};

const router = Router();
router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerFile));

export default router;
