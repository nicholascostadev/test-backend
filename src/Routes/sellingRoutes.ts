import { Router } from 'express'
import { sellingController } from '../Controllers/sellingController'

const router = Router()
// get all sellings
router.get('/sellings', sellingController.getAllSellings)
// create a new selling
router.post('/sellings', sellingController.createSelling)
// delete a selling
router.delete('/sellings/:id', sellingController.deleteSelling)
// update a selling
router.put('/sellings/:id', sellingController.updateSelling)

export default router
