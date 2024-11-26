import { ExportTypeEnum, ScheduleEnum } from '@/lib/generated/api';

export type CurrentSchedule = Record<ExportTypeEnum, ScheduleEnum | null>;

export type ScheduleParams = {
  schedule: ScheduleEnum;
  exportType: ExportTypeEnum;
};
