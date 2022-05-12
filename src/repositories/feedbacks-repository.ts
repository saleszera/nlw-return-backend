export interface FeedbackCreateData {
  type: string;
  comment: string;
  screenshot?: string;
}

export interface FeedbackGetData {
  id: string;
  type: string;
  comment: string;
  screenshot: string | null | undefined;
}

export interface FeedbacksRepository {
  create: (data: FeedbackCreateData) => Promise<void>;
  get: () => Promise<FeedbackGetData[]>;
  destroy: (id: string) => Promise<void>;
}
