/**
 * Authorization Roles
 */
const authRoles = {
  admin: ['ROLE_ADMIN'],
  member: ['ROLE_ADMIN', 'ROLE_MEMBER'],
  user: ['ROLE_ADMIN', 'ROLE_MEMBER', 'ROLE_USER'],
  onlyGuest: [],
};

export default authRoles;
