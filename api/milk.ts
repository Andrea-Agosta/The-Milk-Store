import express from 'express';
import { Request, Response } from 'express';
import { IQuery } from 'type';
const router = express.Router();
import { getAllMilks, getDataById, updateDatabyId } from '../db/index';


router.get('/', async (req: Request<{}, {}, {}, IQuery>, res: Response) => {
  try {
    const response = await getAllMilks(req);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const response = await getDataById(req.params.id);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const response = await updateDatabyId(req.params.id, req.body.quantity);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

export default router;