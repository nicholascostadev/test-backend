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
// set ids for sellings(used because database doesn't have unique ids)
router.post('/sellings/newId', sellingController.newId)

export default router
