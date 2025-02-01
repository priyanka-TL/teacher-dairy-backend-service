/**
 * name : configs
 * author : Priyanka Pradeep
 * Date : 28-Jan-2025
 * Description : Contains connections of all configs
 */

//Dependencies
require("@configs/cache")();
const path = require("path");

global.PROJECT_ROOT_DIRECTORY = path.join(__dirname, "..");
