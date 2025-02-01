/**
 * name : constants/common.js
 * author : Aman Kumar Gupta
 * Date : 29-Sep-2021
 * Description : All commonly used constants through out the service
 */

function getPaginationOffset(page, limit) {
  return (page - 1) * limit;
}

module.exports = {
  pagination: {
    DEFAULT_PAGE_NO: 1,
    DEFAULT_PAGE_SIZE: 100,
  },
  getPaginationOffset,
  internalAccessUrls: [
    process.env.APPLICATION_BASE_URL + "v1/resource/publishCallback",
  ],
  ADMIN_ROLE: "admin",
  ORG_ADMIN_ROLE: "org_admin",
  TEACHER_ROLE: "teacher",
  STUDENT_ROLE: "student",
  PARENT_ROLE: "parent",
  PUBLIC_ROLE: "public",

  roleValidationPaths: ["/ptd/v1/classes/update"],
};
