// console.log('Hello World');

// const num = 10 + 5;
// console.log(num);

// const utils = require('./utils');
// const { sayHello, calculateVat } = require('./utils');

// utils.sayHello();
// sayHello();

// const vat = utils.calculateVat(100, 7);
// const vat = calculateVat(100, 7);
// console.log(vat);

// (function (exports, require, module, __filename, __dirname) {
const { sayHello, calculateVat } = require('./utils');

// sayHello();

// vat = calculateVat(100, 7);
// console.log(vat);

// console.log(__filename, __dirname);

/*-------------------------------- 'Path' module in node ------------------------------*/
// const path = require('path');

// console.log(path.basename(__filename));
// console.log(path.dirname(__filename));
// console.log(path.extname(__filename));
// console.log(path.parse(__filename));
// console.log(path.join(__dirname, 'utils.js'));

/*-------------------------------- 'File System' module in node ------------------------------*/
// const fs = require('fs');

// fs.writeFileSync(path.join(__dirname, 'data.txt'), 'test');

/*-------------------------------- 'OS' module in node ------------------------------*/
const os = require('os');

// console.log(os.cpus());
// console.log(os.homedir());
// console.log(os.uptime());

/*-------------------------------- 'Events' module in node ------------------------------*/
// const events = require('events');
// // const EvenEmitter = events.EvenEmitter;
// class EvenEmitter extends events.EventEmitter {}
// const connect = new EvenEmitter();

// connect.on('online', () => {
// 	console.log('A new user has connected');
// });

// connect.emit('online');
// connect.emit('online');
// connect.emit('online');
// connect.emit('online');
// connect.emit('online');

// });

/*-------------------------------- 'HTTP' module in node ------------------------------*/
const http = require('http');
const path = require('path');
const fs = require('fs');
const moment = require('moment');

function getPage(page) {
	const filePath = path.join(__dirname, page);
	return fs.readFileSync(filePath, 'utf8');
}

function handleFiles(req, res) {
	const fileType = path.extname(req.url) || '.html';
	if (fileType === '.html') {
		res.setHeader('Content-Type', 'text/html');
		res.writeHead(200);

		if (req.url === '/') {
			res.write(getPage('index.html'));
		} else {
			res.write(getPage(`${req.url}.html`));
		}
		res.end;
	} else if (fileType === '.css') {
		res.setHeader('Content-Type', 'text/css');
		res.writeHead(200);
		res.write(getPage(req.url));
		res.end();
	} else {
		res.writeHead(404);
		res.end();
	}
}

function getData(url) {
	let data;
	if (url === '/apis/users') {
		data = [{ name: 'Varayut' }, { name: 'John' }];
	} else if (url === '/apis/posts') {
		data = [
			{
				title: 'A',
				publishedDate: moment().startOf('day').fromNow(),
			},
			{
				title: 'B',
				publishedDate: moment().set('month', 1).startOf('day').fromNow(),
			},
		];
	}
	return data;
}

function handleAPIs(req, res) {
	let data = getData(req.url);

	if (data) {
		res.setHeader('Content-Type', 'application/json');
		res.write(JSON.stringify(data));
	} else {
		res.writeHead(404);
	}
	res.end();
}

http
	.createServer((req, res) => {
		if (req.url.startsWith('/apis/')) {
			handleAPIs(req, res);
		} else {
			handleFiles(req, res);
		}
	})
	.listen(3000);
