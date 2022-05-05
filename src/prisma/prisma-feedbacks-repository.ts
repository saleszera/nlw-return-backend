import { prisma } from '../prisma';
import {
  FeedbacksRepository,
  FeedbackCreateData,
} from '../repositories/feedbacks-repository';

export class PrismaFeeedbacksRepository implements FeedbacksRepository {
  async create({ type, comment, screenshot }: FeedbackCreateData) {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      },
    });
  }
}
