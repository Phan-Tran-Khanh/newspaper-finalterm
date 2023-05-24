export const ROLES = [
  'ADMIN',
  'EDITOR',
  'WRITER',
  'SUBSCRIBER',
  'USER',
] as const;
export type UserRole = (typeof ROLES)[number];
