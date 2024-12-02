import { ActivityLogDetailSchema } from '@/lib/generated/api';

export const getActivityUsername = (activity: ActivityLogDetailSchema) => {
  if (activity.event_context?.current_state) {
    return `${activity.event_context.current_state.firstname} ${activity.event_context.current_state.lastname}` 
  }
  
  return `${activity.event_context?.firstname} ${activity.event_context?.lastname}`
}