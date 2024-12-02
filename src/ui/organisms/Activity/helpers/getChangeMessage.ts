import { ActivityLogDetailSchema } from '@/lib/generated/api';

export const getChangeMessage = (activity: ActivityLogDetailSchema) => {
  const prevState = activity.event_context?.previous_state;
  const currState = activity.event_context?.current_state;

  const changes: string[] = [];

  const prevName = `${activity.event_context?.previous_state.firstname} ${activity.event_context?.previous_state.lastname}`;
  const currName = `${activity.event_context?.current_state.firstname} ${activity.event_context?.current_state.lastname}`;

  if (prevName !== currName) {
    changes.push(`Set new name (previous name - ${prevName})`);
  }

  const prevPermissions = new Set(prevState?.permissions);
  const currPermissions = new Set(currState?.permissions);

  const addedPermissions = [...Array.from(currPermissions)].filter(
    (permission) => !prevPermissions.has(permission),
  );
  if (addedPermissions.length) {
    changes.push(
      `Get new permission${addedPermissions.length > 1 ? 's' : ''}: ${addedPermissions.join(', ')}`,
    );
  }

  const removedPermissions = [...Array.from(prevPermissions)].filter(
    (permission) => !currPermissions.has(permission),
  );
  if (removedPermissions.length) {
    changes.push(`Deprived of the permission${removedPermissions.length > 1 ? 's' : ''} ${removedPermissions.join(', ')}`);
  }

  const prevMachines = new Set(prevState?.machine_names);
  const currMachines = new Set(currState?.machine_names);

  const addedMachines = [...Array.from(currMachines)].filter(
    (machine) => !prevMachines.has(machine),
  );
  if (addedMachines.length) {
    changes.push(
      `Get new assigned machine${addedMachines.length > 1 ? 's' : ''}: ${addedMachines.join(', ')}`,
    );
  }

  const removedMachines = [...Array.from(prevMachines)].filter(
    (machine) => !currMachines.has(machine),
  );
  if (removedMachines.length) {
    changes.push(`Deprived of the machine${removedMachines.length > 1 ? 's' : ''} ${removedMachines.join(', ')}`);
  }

  if (prevState?.role !== currState?.role) {
    changes.push(
      `Get a new role: ${currState?.role} (previous role: ${prevState?.role})`,
    );
  }

  return changes.length > 0 ? changes.join('.\n\n') + '.' : 'was edited';
};
