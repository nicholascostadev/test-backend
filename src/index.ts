import cors from 'cors'
import fs from 'fs'
import express from 'express'
import sellings from './db.json'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (_, res) => {
  return res.send('Hello World!')
})

app.get('/sellings', (req, res) => {
  const headers = req.headers

  const limit = Number(headers.limit) || 20
  const offset = Number(headers.offset) || 0

  res.status(200).json(sellings.slice(offset, limit))
})

app.post('/sellings', (req, res) => {
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
})

app.delete('sellings/:id', (req, res) => {
  const { id } = req.params

  fs.writeFile(
    './db.json',
    JSON.stringify(
      sellings.filter((selling) => selling['Código Venda'] !== Number(id))
    ),
    (err) => {
      if (err) {
        res.status(500).json({ message: 'Error while deleting the selling' })
      } else {
        res.status(200).json({ message: 'Selling deleted successfully' })
      }
    }
  )
})

app.put('sellings/:id', (req, res) => {
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
})

app.listen(3333, () => console.log('Server is running on port 3333'))
