import { Request, Response } from 'express'
import * as fs from 'fs'
import path from 'path'
import sellings from '../db.json'
const dbFileLocation = path.join(__dirname, '..', 'db.json')

export class sellingController {
  static getAllSellings(req: Request, res: Response) {
    const query = req.query

    const limit = Number(query._limit) || 20
    const offset = Number(query._offset) || 0

    res.status(200).json(sellings.slice(offset, limit))
  }
  static createSelling(req: Request, res: Response) {
    const { selling: newSelling }: { selling: Selling } = req.body

    fs.writeFile(
      dbFileLocation,
      JSON.stringify([...sellings, newSelling]),
      (err) => {
        if (err) {
          res.status(500).json({ message: 'Error while saving the selling' })
        } else {
          res.status(201).json({ message: 'Selling saved successfully' })
        }
      }
    )

    res.status(201).json(sellings)
  }

  static deleteSelling(req: Request, res: Response) {
    const { id } = req.params

    const newSellings = sellings.filter(
      (selling) => Number(selling['Código Venda']) !== Number(id)
    )

    fs.writeFile(
      dbFileLocation,
      JSON.stringify(newSellings),
      { encoding: 'utf8' },
      (err) => {
        if (err) {
          res.status(500).json({ message: 'Error while deleting the selling' })
        } else {
          res.status(200).json({
            message: 'Selling deleted successfully',
            data: newSellings,
          })
        }
      }
    )
  }

  static updateSelling(req: Request, res: Response) {
    const { id } = req.params
    const { selling: newSelling }: { selling: Selling } = req.body

    fs.writeFile(
      dbFileLocation,
      JSON.stringify(
        sellings.map((selling) =>
          selling['Código Venda'] === Number(id) ? newSelling : selling
        )
      ),
      (err) => {
        if (err) {
          res.status(500).json({ message: 'Error while updating the selling' })
        } else {
          res.status(200).json({ message: 'Selling updated successfully' })
        }
      }
    )
  }
}
