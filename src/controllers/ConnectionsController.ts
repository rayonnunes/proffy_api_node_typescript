import { Request, Response, request, response } from "express";
import db from '../database/connection';

export default class ConnectionController {
  async index (req: Request, res: Response) {
    const totalConnections = await db('connections').count('* as total')

    const { total } = totalConnections[0];

    return res.json({ total });
  }

  async create (req: Request, res: Response) {
    const { user_id } = req.body;
    const trx = await db.transaction();
    try {
      await trx('connections').insert({
        user_id,
      });
      await trx.commit();
    } catch (error) {
      await trx.rollback();
      return res.status(500).json({
        error: 'Unexpected error while creating new connection'
      })
    }

    return res.status(201).send();
  }
}
