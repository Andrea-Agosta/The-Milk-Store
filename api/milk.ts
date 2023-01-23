import milksDb from '../db/milksDb.json';
import express from 'express';
import { IMilk } from 'type';
import { Request, Response } from 'express';
const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  res.status(200).json(milksDb);
});

router.get('/:id', (req: Request, res: Response) => {
  const uuidRegex: RegExp = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
  if (req.params.id && uuidRegex.test(req.params.id)) {
    const findMilk = milksDb.results.find((milk: IMilk) => milk.id === req.params.id);
    (req.params.id && findMilk) ? res.status(200).json(findMilk) : res.status(400).json({ error: 'Bad Request' });
  } else {
    res.status(400).json({ error: 'Bad Request' })
  }

});

export default router;