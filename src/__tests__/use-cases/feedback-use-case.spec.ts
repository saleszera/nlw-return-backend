import { PrismaFeeedbacksRepository } from '../../prisma/fake-prisma-feedbacks-repository';
import { FeedbackUseCase } from '../../use-cases/feedback-use-case';

const sendMailSpy = jest.fn();

const fakeFeedbacksRepository = new PrismaFeeedbacksRepository();
const feedback = new FeedbackUseCase(fakeFeedbacksRepository, {
  sendMail: sendMailSpy,
});

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(
      feedback.create({
        type: 'BUG',
        comment: 'example comment',
        screenshot: 'data:image/png;base64test',
      })
    ).resolves.not.toThrow();

    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit a feedback without type', async () => {
    await expect(
      feedback.create({
        type: '',
        comment: 'example comment',
        screenshot: 'data:image/png;base64test',
      })
    ).rejects.toThrow();
  });

  it('should not be able to submit a feedback without comment', async () => {
    await expect(
      feedback.create({
        type: 'BUG',
        comment: '',
        screenshot: 'data:image/png;base64test',
      })
    ).rejects.toThrow();
  });

  it('should not be able to submit a feedback with an invalid image format', async () => {
    await expect(
      feedback.create({
        type: 'BUG',
        comment: 'example comment',
        screenshot: 'test.jpg',
      })
    ).rejects.toThrow();
  });
});

describe('Get feedbacks', () => {
  it('should be able to get all feedbacks', async () => {
    await expect(feedback.get()).resolves.not.toThrow();
  });
});

describe('Delete an feedback', () => {
  it('Should not be able to delete an feedback with invalid ID', async () => {
    await expect(feedback.destroy('test-123')).rejects.toThrow();
  });

  it('should be able to delete an feedback', async () => {
    const [firstFeedback] = await feedback.get();

    await expect(feedback.destroy(firstFeedback.id)).resolves.not.toThrow();
  });

  it('should not be able to delete and feedback without feedbacks storaged', async () => {
    const feedbacks = await feedback.get();
    await expect(feedback.destroy('test-123')).rejects.toThrow();
  });
});
