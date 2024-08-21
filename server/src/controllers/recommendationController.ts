import { Request, Response } from 'express';
import Recommendation from '../models/recommendation';

export const createRecommendation = async (req: Request, res: Response) => {
    try {
        const recommendation = new Recommendation(req.body);
        await recommendation.save();
        res.status(201).json(recommendation);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllRecommendations = async (req: Request, res: Response) => {
    try {
        const recommendations = await Recommendation.find();
        res.json(recommendations);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getRecommendationById = async (req: Request, res: Response) => {
    try {
        const recommendation = await Recommendation.findById(req.params.id);
        if (recommendation) {
            res.json(recommendation);
        } else {
            res.status(404).json({ message: 'Recommendation not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateRecommendation = async (req: Request, res: Response) => {
    try {
        const recommendation = await Recommendation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (recommendation) {
            res.json(recommendation);
        } else {
            res.status(404).json({ message: 'Recommendation not found' });
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteRecommendation = async (req: Request, res: Response) => {
    try {
        const recommendation = await Recommendation.findByIdAndDelete(req.params.id);
        if (recommendation) {
            res.json({ message: 'Recommendation deleted' });
        } else {
            res.status(404).json({ message: 'Recommendation not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
