let config = {
	host: 'localhost',
	user: 'root',
	port: '3306',
	password: 'admin',
	database: 'map',
	charset: 'utf8'
};



/**
 * Модуль для работы с запросами SQL
 * @module db/query
 * @member query
 */

//подключение библиотеки для работы с БД

//подключение библиотеки для работы с Promise
const q = require('q');
//подключение модуля для работы с БД
const mysql = require('mysql2');
//подключение к БД
const db = mysql.createPool(config);

/**
 * Выполнение SELECT запроса
 * @function selectDB
 * @async
 * @param {String} sql Текст запроса
 * @returns {Promise<Array, String>} resp
 * @returns {Array} resp.data -  Список полученных данных
 * @returns {String} resp.err -  Текст ошибки
 * @memberof query
 * */
exports.selectDB = sql => {
	//создание Promise
	let result = q.defer();
	//переменная для хранения результата
	let resp = {
		err: null,
		data: null
	};
	//выполнение запроса
	db.query(sql, (err, rows) => {
		//добавление днных выполения в главный результат
		if (err) {
			resp.err = err.sqlMessage;
		} else {
			resp.data = rows;
		}
		//добалвение результата в Promise
		result.resolve(resp);
	});
	//возврат результата
	return result.promise;
};

/**
 * Доабвление данных
 * @function insertDB
 * @async
 * @param {String} sql Текст запроса
 * @returns {Promise<String>} resp
 * @returns {String} resp.err -  Текст ошибки
 * @memberof query
 *  */
exports.insertDB = sql => {
	//создание Promise
	let result = q.defer();
	//переменная для хранения результата
	let resp = {
		err: null
	};
	//выполнение запроса
	db.query(sql, (err, rows) => {
		//проверка на ошибки и доавление в  главный результат
		if (err) {
			resp.err = err.sqlMessage;
		}
		//добалвление результата в Promise
		result.resolve(resp);
	});
	//возврат результата
	return result.promise;
};
