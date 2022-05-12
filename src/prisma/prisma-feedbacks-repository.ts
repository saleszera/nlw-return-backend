import { prisma } from '../prisma';
import {
  FeedbacksRepository,
  FeedbackCreateData,
  FeedbackGetData,
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

  async get(): Promise<FeedbackGetData[]> {
    const feedbacks = await prisma.feedback.findMany();

    return feedbacks;
  }

  async destroy(id: string) {
    await prisma.feedback.delete({ where: { id } });
  }
}
