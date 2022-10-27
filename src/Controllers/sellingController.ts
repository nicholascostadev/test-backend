import { Request, Response } from 'express'
import fs from 'fs'
import sellings from '../db.json'

export class sellingController {
  static getAllSellings(req: Request, res: Response) {
    const headers = req.headers

    const limit = Number(headers.limit) || 20
    const offset = Number(headers.offset) || 0

    res.status(200).json(sellings.slice(offset, limit))
  }
  static createSelling(req: Request, res: Response) {
    const { selling: newSelling } = req.body

    fs.writeFile(
      './db.json',
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
      (selling) => selling['Código Venda'] !== Number(id)
    )

    fs.writeFile('./db.json', JSON.stringify(newSellings), (err) => {
      if (err) {
        res.status(500).json({ message: 'Error while deleting the selling' })
      } else {
        res.status(200).json({ message: 'Selling deleted successfully' })
      }
    })
  }

  static updateSelling(req: Request, res: Response) {
    const { id } = req.params
    const { selling: newSelling } = req.body

    fs.writeFile(
      './db.json',
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
