const item = {
	"name": "Avocado",
	"type": "Fruit",
	"category": "Food",
	"price": 200
}

const applyCoupon = item => {
	return discount => {
		discount ? item.price = (item.price - (item.price/discount)) : null;
		return item;
	}
}

console.log(applyCoupon(item)(10));