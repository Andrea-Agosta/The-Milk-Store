import express from 'express';
import { Request, Response } from 'express';
import { IQuery, ISearch } from 'type';
const router = express.Router();
import { getAll, getAllFromSearch, getAllMilks, getDataById, updateDatabyId } from '../db/index';


router.get('/', async (_req: Request, res: Response) => {
  try {
    const response = await getAllMilks();
    res.status(200).json(response);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.get('/filter', async (req: Request<{}, {}, {}, IQuery>, res: Response) => {
  console.log(req.query);

  try {
    const response = await getAll(req.query.type, req.query.page);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.get('/search', async (req: Request<{}, {}, {}, ISearch>, res: Response) => {
  try {
    const response = await getAllFromSearch(req.query.search, req.query.page);
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