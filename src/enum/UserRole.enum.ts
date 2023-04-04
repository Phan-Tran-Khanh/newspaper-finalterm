export const ROLES = [
  'ADMIN',
  'EDITOR',
  'WRITER',
  'SUBCRIBER',
  'USER',
] as const;
export type UserRole = (typeof ROLES)[number];
