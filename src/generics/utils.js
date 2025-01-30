/**
 * name : utils.js
 * author : Priyanka Pradeep
 * Date : 28 - Jan - 2025
 * Description : Utils helper function.
 */

const { RedisCache, InternalCache } = require('elevate-node-cache')
const startCase = require('lodash/startCase')
const _ = require('lodash')

function internalSet(key, value) {
	return InternalCache.setKey(key, value)
}
function internalGet(key) {
	return InternalCache.getKey(key)
}
function internalDel(key) {
	return InternalCache.delKey(key)
}

function redisSet(key, value, exp) {
	return RedisCache.setKey(key, value, exp)
}
function redisGet(key) {
	return RedisCache.getKey(key)
}
function redisDel(key) {
	return RedisCache.deleteKey(key)
}
const capitalize = (str) => {
	return startCase(str)
}
function isNumeric(value) {
	return /^\d+$/.test(value)
}



module.exports = {
	internalSet,
	internalDel,
	internalGet,
	redisSet,
	redisGet,
	redisDel,
	capitalize,
	isNumeric
}