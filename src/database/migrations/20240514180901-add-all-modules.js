'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('modules', null, {})

		const modulesData = [
			{ code: 'all', status: 'ACTIVE', created_at: new Date(), updated_at: new Date() },
			{ code: 'teachers', status: 'ACTIVE', created_at: new Date(), updated_at: new Date() },
			{ code: 'modules', status: 'ACTIVE', created_at: new Date(), updated_at: new Date() },
			{ code: 'parents', status: 'ACTIVE', created_at: new Date(), updated_at: new Date() },
			{ code: 'students', status: 'ACTIVE', created_at: new Date(), updated_at: new Date() },
			{ code: 'entity-types', status: 'ACTIVE', created_at: new Date(), updated_at: new Date() },
			{ code: 'entities', status: 'ACTIVE', created_at: new Date(), updated_at: new Date() },
			{ code: 'role-permission-mapping', status: 'ACTIVE', created_at: new Date(), updated_at: new Date() },
			{ code: 'users', status: 'ACTIVE', created_at: new Date(), updated_at: new Date() },
			{ code: 'posts', status: 'ACTIVE', created_at: new Date(), updated_at: new Date() },
		]

		// Insert the data into the 'modules' table
		await queryInterface.bulkInsert('modules', modulesData)
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('modules', null, {})
	},
}
