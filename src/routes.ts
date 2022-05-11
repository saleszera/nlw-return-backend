import express from 'express';

import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeeedbacksRepository } from './prisma/prisma-feedbacks-repository';
import { FeedbackUseCase } from './use-cases/feedback-use-case';

export const routes = express.Router();

const prismaFeeedbacksRepository = new PrismaFeeedbacksRepository();
const nodemailerMailAdapter = new NodemailerMailAdapter();
const feedbackUseCase = new FeedbackUseCase(
  prismaFeeedbacksRepository,
  nodemailerMailAdapter
);

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  await feedbackUseCase.create({ type, comment, screenshot });

  return res.status(201).send();
});

routes.get('/feedbacks', async (_, res) => {
  const feedbacks = await feedbackUseCase.get();

  if (!feedbacks.length) {
    return res.status(204).send();
  }

  return res.status(200).json({ data: feedbacks });
});
