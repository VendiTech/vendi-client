import { ActivityLogDetailSchema, EventTypeEnum } from '@/lib/generated/api';
import { getChangeMessage } from './getChangeMessage';

export const getActivityContent = (activity: ActivityLogDetailSchema) => {
  switch (activity.event_type) {
    case EventTypeEnum.Edited:
      return getChangeMessage(activity);

    case EventTypeEnum.Deleted:
      return 'was deleted';

    case EventTypeEnum.EmailVerified:
      return 'verified email address';

    case EventTypeEnum.ForgotPassword:
      return 'reset password';

    case EventTypeEnum.ScheduleCreation:
      return `created ${activity.event_context?.schedule.toLowerCase()} scheduled ${activity.event_context?.export_type}
       export for ${activity.event_context?.entity_type}`;

    case EventTypeEnum.ScheduleDeletion:
      return `deleted ${activity.event_context?.schedule.toLowerCase()} scheduled ${activity.event_context?.export_type}
       export for ${activity.event_context?.entity_type}`;

    case EventTypeEnum.Register:
      return 'was registered in the system';

    case EventTypeEnum.ResetPassword:
      return "'s password was reset by an admin";

    default:
      const check: never = activity.event_type;
      return '';
  }
};
