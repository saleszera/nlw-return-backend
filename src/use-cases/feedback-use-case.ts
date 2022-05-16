import { MailAdapter } from '../adapters/mail-adapter';
import { FeedbacksRepository } from '../repositories/feedbacks-repository';

interface SubmitFeedbackCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

interface PutFeedbackCaseRequest {
  id: string;
  comment?: string;
}

export class FeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async create(request: SubmitFeedbackCaseRequest) {
    const { type, comment, screenshot } = request;
    if (!type) {
      throw new Error('Type is required.');
    }

    if (!comment) {
      throw new Error('Comment is required.');
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format.');
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      attachments: [
        {
          filename: 'feedback-screenshot.png',
          path: screenshot,
          encoding: 'base64',
        },
      ],
      body: [
        '<div style="font-family: sans-serif; font-size: 16px; color: #222;padding: 8px;letter-spacing: 1.5px;line-height: 18px;text-align: justify;">',
        `<p>Tipo do feedback <strong>${type}</strong></p>`,
        `<p><strong>Comentário:</strong> ${comment}</p>`,
        screenshot
          ? `<img src="${screenshot}" alt="${type}" style="max-width: 600px;border-radius: 4px;"/>`
          : '',
        '</div>',
      ].join('\n'),
    });
  }

  async get() {
    const feedbacks = await this.feedbacksRepository.get();

    return feedbacks;
  }

  async put({ id, comment }: PutFeedbackCaseRequest) {
    const feedbacks = await this.feedbacksRepository.get();

    if (!feedbacks.length) {
      throw new Error('There are no feedbacks');
    }

    const checkFeedbackExists = feedbacks.some(
      (feedback) => feedback.id === id
    );

    if (!checkFeedbackExists) {
      throw new Error(`There is not feedback with this ID ${id}`);
    }

    if (!comment) {
      return;
    }

    await this.feedbacksRepository.put({ id, comment });
  }

  async destroy(id: string) {
    const feedbacks = await this.feedbacksRepository.get();

    if (!feedbacks.length) {
      throw new Error('There are no feedbacks');
    }

    const checkFeedbackExists = feedbacks.some(
      (feedback) => feedback.id === id
    );

    if (!checkFeedbackExists) {
      throw new Error(`There is not feedback with this ID ${id}`);
    }

    await this.feedbacksRepository.destroy(id);
  }
}
