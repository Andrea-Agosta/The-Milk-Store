import express from 'express';
import { Request, Response } from 'express';
import { IQuery, ISearch } from 'type';
const router = express.Router();
import { getAll, getAllFromSearch, getAllMilks } from '../db/index';


router.get('/', async (_req: Request, res: Response) => {
  try {
    const response = await getAllMilks();
    res.status(200).json(response);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.get('/filter', async (req: Request<{}, {}, {}, IQuery>, res: Response) => {
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

// router.get('/:id', (req: Request, res: Response) => {
//   const uuidRegex: RegExp = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
//   if (req.params.id && uuidRegex.test(req.params.id)) {
//     // const findMilk = milksDb.results.find((milk: IMilk) => milk.id === req.params.id);
//     const findMilk: IMilk = getById(req.params.id, req.params.type, req.params.page)
//       (req.params.id && findMilk) && res.status(200).json(findMilk);
//   } else {
//     res.status(400).json({ error: 'Bad Request' })
//   }
// });

export default router;