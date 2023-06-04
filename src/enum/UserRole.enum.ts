export const ROLES = ['Admin', 'Editor', 'Writer', 'Subscriber'] as const;
export type UserRole = (typeof ROLES)[number];
