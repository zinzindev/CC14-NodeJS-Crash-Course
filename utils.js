// exports.calculateVat = function calculateVat(money, vat) {
function calculateVat(money, vat) {
	return (money * vat) / 100;
}

//
//  exports.sayHeoo = function sayHello() {
function sayHello() {
	console.log('Hello');
}

module.exports = {
	calculateVat,
	sayHello,
};
