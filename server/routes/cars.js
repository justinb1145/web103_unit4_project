import express from 'express'
import CarsController from '../controllers/cars.js'

// import controller for custom items


const router = express.Router()

router.get('/', CarsController.getGifts)
router.get('/:giftId', CarsController.getGiftById) 
router.post('/', CarsController.createGift)
router.delete('/:id', CarsController.deleteGift)
router.patch('/:id', CarsController.updateGift)

export default Router