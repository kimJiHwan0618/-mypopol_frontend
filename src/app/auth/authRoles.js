/**
 * Authorization Roles
 */
const authRoles = {
  admin: ['SUPER'],
  member: ['SUPER', 'PREMIUM', 'BASIC'],
  user: ['SUPER', 'PREMIUM', 'BASIC', 'FREE'],
  onlyGuest: [],
};

export default authRoles;
