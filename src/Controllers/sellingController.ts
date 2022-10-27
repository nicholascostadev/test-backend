import { Request, Response } from 'express'
import * as fs from 'fs'
import path from 'path'
import sellings from '../db.json'
const dbFileLocation = path.join(__dirname, '..', 'db.json')

export class sellingController {
  // TODO: Finish sorting
  // we're already getting the sorting direction from the client,
  // but we need to make the sorting work, we're receiving 'asc' | 'desc' | 'default'
  // default, return as it is in db.json, asc, return from lower to higher,
  // desc, return from higher to lower
  static getAllSellings(req: Request, res: Response) {
    const query = req.query

    const sellingsCopy = [...sellings]

    const limit = Number(query._limit) || 20
    const offset = Number(query._offset) || 0

    const dateOrder = query.dateOrder as DateOrder | undefined

    switch (dateOrder) {
      case 'asc':
        sellingsCopy.sort((a, b) => {
          return new Date(a['Data']).getTime() - new Date(b['Data']).getTime()
        })
        break
      case 'desc':
        sellingsCopy.sort((a, b) => {
          return new Date(b['Data']).getTime() - new Date(a['Data']).getTime()
        })
        break
      default:
        return res.status(200).json(sellings.slice(offset, limit))
    }

    res.status(200).json(sellingsCopy.slice(offset, limit))
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
      // @ts-ignore
      (selling) => Number(selling.id) !== Number(id)
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
          // @ts-ignore
          selling.id === Number(id) ? newSelling : selling
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

  static newId(req: Request, res: Response) {
    // add unique id to all sellings in db
    const newSellings = sellings.map((selling, index) => ({
      ...selling,
      id: index + 1,
    }))
    fs.writeFile(
      dbFileLocation,
      JSON.stringify(newSellings),
      { encoding: 'utf8' },
      (err) => {
        if (err) {
          res.status(500).json({ message: 'Error while updating the selling' })
        } else {
          res.status(200).json({ message: 'Selling updated successfully' })
        }
      }
    )
  }
  static deleteManySellings(req: Request, res: Response) {
    const { ids } = req.params
    const idsArray = ids.split(',')
    const newSellings = sellings.filter(
      // @ts-ignore
      (selling) => !idsArray.includes(String(selling.id))
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
}
