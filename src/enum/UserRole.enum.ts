export const ROLES = [
  'Admin',
  'Editor',
  'Writer',
  'Subscriber',
  'User',
] as const;
export type UserRole = (typeof ROLES)[number];
