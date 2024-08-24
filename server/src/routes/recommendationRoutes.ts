import { Router } from 'express';
import { createRecommendation, getAllRecommendations, getRecommendationById, updateRecommendation, deleteRecommendation } from '../controllers/recommendationController';

const router = Router();

router.post('/', createRecommendation);
router.get('/', getAllRecommendations);
router.get('/:id', getRecommendationById);
router.put('/:id', updateRecommendation);
router.delete('/:id', deleteRecommendation);

export default router;
