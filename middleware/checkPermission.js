const Permissions = require('../constants/Permissions');
const db = require('../database/connection');

async function checkPermission(roleArray, PermissionsRequire) {
  const roleIds = roleArray.map(role => role.id);
  const placeholders = roleIds.map(() => '?').join(',');

  const rows = await new Promise((resolve, reject) => {
    db.query(`
        SELECT DISTINCT permission_name
        FROM role_permission
        WHERE role_id IN (${placeholders})
      `, roleIds, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
  });

  const permissions = rows.map(r => r.permission_name);
if (permissions.includes(Permissions.ADMINISTRATOR)) {
  return true;
}

  return permissions.includes(PermissionsRequire);
}

module.exports = {
  checkPermission,
};
