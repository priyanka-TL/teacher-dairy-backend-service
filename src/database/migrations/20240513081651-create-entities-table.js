'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('entities', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			entity_type_id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			value: {
				type: Sequelize.STRING,
			},
			label: {
				type: Sequelize.STRING,
			},
			status: {
				type: Sequelize.ENUM('ACTIVE', 'INACTIVE'),
				defaultValue: 'ACTIVE',
			},
			type: {
				type: Sequelize.STRING,
			},
			created_by: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			updated_by: {
				type: Sequelize.STRING,
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			deleted_at: {
				type: Sequelize.DATE,
			},
		})
		await queryInterface.addIndex('entities', ['value', 'entity_type_id'], {
			unique: true,
			name: 'unique_entities_value',
			where: {
				deleted_at: null,
			},
		})
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('entities')
	},
}
