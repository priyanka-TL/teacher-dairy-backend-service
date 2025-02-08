// Dependencies
const httpStatusCode = require("@generics/http-status");
const common = require("@constants/common");
const StudentParentMappingQueries = require("@database/queries/studentParentMapping");
const StudentClassMappingQueries = require("@database/queries/studentClassMapping");
const responses = require("@helpers/responses");
const userRequests = require("@requests/user");
const { Op } = require("sequelize");
const classesQueries = require("@database/queries/classes");
const ClassTeacherMappingQueries = require("@database/queries/class-teacher-mapping");
const _ = require("lodash");
module.exports = class StudentsHelper {
  /**
   * list class.
   * @method
   * @name list
   * @param {String} id -  id.
   * @returns {JSON} - class list response.
   */

  static async list(classId, organization_id, pageNo, limit, search) {
    try {
      let result = {
        data: [],
        count: 0,
      };

      // Fetch all students
      let students = await userRequests.list(
        common.STUDENT_ROLE,
        pageNo,
        limit,
        search,
        organization_id
      );

      if (!students.success) {
        return responses.successResponse({
          statusCode: httpStatusCode.ok,
          message: "STUDENT_LIST_FETCHED_SUCCESSFULLY",
          result,
        });
      }

      if (
        !students.data.result.data ||
        !Array.isArray(students.data.result.data) ||
        students.data.result.data.length === 0
      ) {
        return responses.successResponse({
          statusCode: httpStatusCode.ok,
          message: "STUDENT_LIST_FETCHED_SUCCESSFULLY",
          result,
        });
      }

      let userList = students.data.result.data;

      // If classId is provided, filter only students mapped to that class
      if (classId) {
        let classMappings = await StudentClassMappingQueries.findOne(
          {
            class_id: classId,
            organization_id: organization_id,
          },
          { attributes: ["student_id"] }
        );

        // If no students are mapped to this class, return an empty list
        if (!classMappings) {
          return responses.successResponse({
            statusCode: httpStatusCode.ok,
            message: "STUDENT_LIST_FETCHED_SUCCESSFULLY",
            result,
          });
        }

        // Filter only students mapped to the provided classId
        userList = userList.filter(
          (student) =>
            student.id.toString() === classMappings.student_id.toString()
        );
      }

      // Fetch class mappings only for the filtered students
      let studentIds = userList.map((student) => student.id.toString());
      let studentClassMap = {};

      if (studentIds.length > 0) {
        let classMappings = await StudentClassMappingQueries.findAll(
          {
            student_id: { [Op.in]: studentIds },
            organization_id: organization_id,
          },
          { attributes: ["student_id", "class_id"] }
        );

        // Fetch class details for mapped class IDs
        const classIds = [...new Set(classMappings.map((c) => c.class_id))];
        let classDetails = [];

        if (classIds.length > 0) {
          classDetails =
            (await classesQueries.findAll(
              {
                id: { [Op.in]: classIds },
                organization_id: organization_id,
              },
              { attributes: ["id", "name"] }
            )) || [];
        }

        // Create a map of class details
        const classMap = classDetails.reduce((map, cls) => {
          map[cls.id] = { id: cls.id, name: cls.name };
          return map;
        }, {});

        // Map each student to a single class object
        studentClassMap = classMappings.reduce((map, mapping) => {
          map[mapping.student_id] = classMap[mapping.class_id] || null;
          return map;
        }, {});
      }

      // Assign class object to each student
      userList = userList.map((student) => ({
        ...student,
        class: studentClassMap[student.id.toString()] || {},
      }));

      return responses.successResponse({
        statusCode: httpStatusCode.ok,
        message: "STUDENT_LIST_FETCHED_SUCCESSFULLY",
        result: {
          data: userList,
          count: userList.length,
        },
      });
    } catch (error) {
      throw error;
    }
  }
  /**
   * Map a student to a parent.
   * @method
   * @name mapToParent
   * @param {Object} req - The request object.
   * @param {String} req.query.student_id - The ID of the student to map.
   * @param {String} req.query.parent_id - The ID of the parent to map.
   * @param {String} req.decodedToken.id - The ID of the user performing the action.
   * @param {String} req.decodedToken.organization_id - The ID of the organization.
   * @returns {JSON} - Response indicating success or failure.
   */
  static async mapToParent(
    studentId,
    parentId,
    relationShip,
    userId,
    organizationId
  ) {
    try {
      // Check if the mapping already exists
      const existingMapping = await StudentParentMappingQueries.findOne({
        student_id: studentId,
        parent_id: parentId,
        organization_id: organizationId,
      });

      if (existingMapping?.id) {
        return responses.failureResponse({
          message: "STUDENT_ALREADY_MAPPED_TO_PARENT",
          statusCode: httpStatusCode.bad_request,
          responseCode: "CLIENT_ERROR",
        });
      }

      // Create the student-parent mapping
      const mappingData = {
        student_id: studentId,
        parent_id: parentId,
        relationship: relationShip || "Guardian",
        organization_id: organizationId,
        created_by: userId,
      };

      const createdMapping = await StudentParentMappingQueries.create(
        mappingData
      );

      return responses.successResponse({
        statusCode: httpStatusCode.created,
        message: "STUDENT_MAPPED_TO_PARENT_SUCCESSFULLY",
        result: createdMapping,
      });
    } catch (error) {
      return error;
    }
  }

  /**
   * Fetch details of a specific student
   * @method
   * @name getStudentDetails
   * @param {String} req.params.studentId - The ID of the student.
   * @returns {JSON} - Response containing student details.
   */

  static async getStudentDetails(studentId, userToken) {
    try {
      // Fetch student details

      let student;
      let studentDetails = await userRequests.details(userToken, studentId);

      if (!studentDetails.success) {
        return responses.failureResponse({
          statusCode: httpStatusCode.bad_request,
          message: "STUDENT_NOT_FOUND",
        });
      }

      if (studentDetails.data && studentDetails.data.result) {
        student = studentDetails.data.result;
      }

      let organizationId = student?.organization_id?.toString();

      // Fetch class mapping for the student
      let classMapping = await StudentClassMappingQueries.findOne(
        {
          student_id: studentId.toString(),
          organization_id: organizationId,
        },
        {
          attributes: ["class_id"],
        }
      );

      let classDetails = {};
      let teacherDetails = [];
      let parentDetails = {};

      if (classMapping?.class_id) {
        classDetails = await classesQueries.findOne(
          {
            id: classMapping.class_id,
            organization_id: organizationId,
          },
          { attributes: ["id", "name"] }
        );

        if (classDetails?.id) {
          let teacherClassMapping = await ClassTeacherMappingQueries.findAll(
            {
              class_id: classDetails?.id,
              organization_id: organizationId,
            },
            { attributes: ["teacher_id"] }
          );

          const mappedTeacherIds = teacherClassMapping.map((mapping) =>
            mapping.teacher_id.toString()
          );

          if (mappedTeacherIds.length > 0) {
            let teachers = await userRequests.list(
              common.TEACHER_ROLE,
              null,
              null,
              "",
              student.organization_id
            );

            if (teachers.success && teachers.data && teachers.data.result) {
              teacherDetails = teachers.data.result.data.filter((teacher) =>
                mappedTeacherIds.includes(teacher.id.toString())
              );
            }
          }
        }

        // Fetch parent details
        let parentMapping = await StudentParentMappingQueries.findOne(
          {
            student_id: studentId.toString(),
            organization_id: organizationId,
          },
          {
            attributes: ["parent_id", "relationship"],
          }
        );

        if (parentMapping?.parent_id) {
          let parentInfo = await userRequests.details(
            userToken,
            parentMapping.parent_id
          );
          if (parentInfo.success && parentInfo.data && parentInfo.data.result) {
            parentDetails = {
              ..._.pick(parentInfo.data.result, [
                "id",
                "name",
                "phone",
                "organization_id",
              ]),
              relationship: parentMapping.relationship,
            };
          }
        }
      }

      return responses.successResponse({
        statusCode: httpStatusCode.ok,
        message: "STUDENT_DETAILS_FETCHED_SUCCESSFULLY",
        result: {
          ..._.pick(student, [
            "id",
            "name",
            "preferred_language",
            "organization",
          ]),
          class: _.pick(classDetails, ["id", "name"]) || null,
          parent: parentDetails || null,
          teachers: teacherDetails || [],
        },
      });
    } catch (error) {
      return error;
    }
  }
};
