import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class PageView extends Document {
  @Prop()
  pageId: string;

  @Prop()
  country: string;

  @Prop()
  browserName: string;

  @Prop()
  userId: string;

  @Prop({
    // `Date.now()` returns the current unix timestamp (milliseconds) as a number
    default: Date.now,
  })
  viewedAt: Date;
}

export const PageViewSchema = SchemaFactory.createForClass(PageView);
