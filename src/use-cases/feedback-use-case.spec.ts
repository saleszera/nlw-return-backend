import { FeedbackUseCase } from './feedback-use-case';

const createFeedbackSpy = jest.fn();
const getFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const feedback = new FeedbackUseCase(
  { create: createFeedbackSpy, get: getFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(
      feedback.create({
        type: 'BUG',
        comment: 'example comment',
        screenshot: 'data:image/png;base64test',
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
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

    expect(getFeedbackSpy).toHaveBeenCalled();
  });
});
