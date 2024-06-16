import { makeAutoObservable } from "mobx";
import z from "zod";

const ChannelSchema = z.object({
  id: z.number(),
  name: z.string(),
  isCurrentlyFollowed: z.boolean(),
  platform: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z
    .string()
    .datetime()
    .optional(),
});
export type Channel = z.infer<typeof ChannelSchema>;

const VideoSchema = z.object({
  id: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z
    .string()
    .datetime()
    .optional(),
  userId: z.number(),
  videoId: z.number(),
});
export type Video = z.infer<typeof VideoSchema>;

const RecordSchema = z.object({
  channel: ChannelSchema,
  channelId: z.number(),
  createdAt: z.string().datetime(),
  date: z.string().datetime(),
  id: z.number(),
  name: z.string(),
  path: z.string(),
  previewPath: z.string(),
  updatedAt: z
    .string()
    .datetime()
    .optional(),
  user_video: VideoSchema,
});

export type Record = z.infer<typeof RecordSchema>;

const FollowSchema = z.object({
  id: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  userId: z.number(),
  channelId: z.number(),
});

export type Follow = z.infer<typeof FollowSchema>;

const ActiveFollowSchema = z.object({
  id: z.number(),
  name: z.string(),
  isCurrentlyFollowed: z.boolean(),
  platform: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  follow: FollowSchema,
});

export type ActiveFollow = z.infer<typeof ActiveFollowSchema>;

type RecordGroup = {
  [channelId: number]: Record[];
};

export default class RecordStore {
  ///implements IRecordStore
  _activeFollows: ActiveFollow[];
  _records: Record[];
  constructor() {
    this._records = [];
    this._activeFollows = [];
    makeAutoObservable(this);
  }

  setRecords(records: Record[]) {
    records = records.sort(
      (r1: Record, r2: Record) =>
        Number(new Date(r2.date)) - Number(new Date(r1.date))
    );
    this._records = records;
  }

  get records(): Record[] {
    return this._records;
  }

  setActiveFollows(activeFollows: ActiveFollow[]): void {
    this._activeFollows = activeFollows;
  }

  get activeFollows(): ActiveFollow[] {
    return this._activeFollows;
  }

  groupVideosByChannelName(): Record[][] {
    const records = this.records;

    const groupedObj: RecordGroup = records.reduce((acc: RecordGroup, record: Record) => {
      const { channelId } = record;
      if (!acc[channelId]) {
        acc[channelId] = [];
      }
      acc[channelId].push(record);
      return acc;
    }, {});

    const groupedArray = Object.values(groupedObj);
    return groupedArray;
  }
  
}
