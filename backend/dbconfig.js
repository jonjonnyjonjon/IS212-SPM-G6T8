require('dotenv/config')

const config = {
	host: 'localhost',
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: 'spmg6t8'
}

module.exports = config