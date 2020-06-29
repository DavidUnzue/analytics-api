import { Document } from 'mongoose';

export interface PageView {
  pageId: string;
  country?: string;
  browserName?: string;
  userId?: string;
}

export interface PageViewModel extends PageView, Document {}
