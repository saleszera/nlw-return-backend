import { v4 as uuidv4 } from 'uuid';

import {
  FeedbacksRepository,
  FeedbackCreateData,
  FeedbackGetData,
} from '../repositories/feedbacks-repository';

type Feedbacks = {
  data: FeedbackGetData[];
};

const feedbacks: Feedbacks = {
  data: [],
};

export class PrismaFeeedbacksRepository implements FeedbacksRepository {
  async create({ type, comment, screenshot }: FeedbackCreateData) {
    feedbacks.data.push({ id: uuidv4(), type, comment, screenshot });
  }

  async get(): Promise<FeedbackGetData[]> {
    return feedbacks.data;
  }

  async destroy(id: string) {
    const feedbackIndex = feedbacks.data.findIndex(
      (feedback) => feedback.id !== id
    );
    feedbacks.data.splice(feedbackIndex, 1);
  }
}
