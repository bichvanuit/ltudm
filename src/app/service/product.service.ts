import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class ProductService {
	addToCart(productId: number, categoryId: number, numProduct: number) {
		var session = localStorage.getItem("MW_CART"), cart = null,
			object = {
				product_id: productId,
				category_id: categoryId,
				amount: numProduct,
			};
		try {
			cart = JSON.parse(session);
			var index = cart.findIndex(obj => {
				return obj.product_id == productId && obj.category_id == categoryId;
			});
			if (index > -1) {
				cart[index].amount += numProduct;
			} else {
				cart.push(object);
			}
			localStorage.setItem("MW_CART", JSON.stringify(cart));
		} catch (e) {
			localStorage.setItem("MW_CART", "[" + JSON.stringify(object) + "]");
		}
	}

	updateCart(productId: number, categoryId: number, numProduct: number) {
		var cart = JSON.parse(localStorage.getItem("MW_CART"));
		var index = cart.findIndex(obj => {
			return obj.product_id == productId && obj.category_id == categoryId;
		});
		cart[index].amount += numProduct;
		localStorage.setItem("MW_CART", JSON.stringify(cart));
	}

	addRecent(productId: number, categoryId: number) {
		var session = localStorage.getItem("MW_RECENT"), recent = null;
		var object = {
			product_id: productId,
			category_id: categoryId
		};
		try {
			recent = JSON.parse(session);
			var index = recent.findIndex(obj => {
				return obj.product_id == object.product_id && obj.category_id == object.category_id;
			});
			if (index == -1) {
				if (recent.length >= 10) {
					recent.pop();
				}
				recent.unshift(object);
				localStorage.setItem("MW_RECENT", JSON.stringify(recent));
			}
		} catch {
			localStorage.setItem("MW_RECENT", "[" + JSON.stringify(object) + "]");
		}
	}
	getFilterChosen(url: string) {
		let result = [];
		if (url.indexOf("?") > -1) {
			let tmp = url.slice(url.indexOf("?") + 1).split("&");
			result = tmp.map(item => {
				return { [item.split("=")[0]]: decodeURIComponent(item.split("=")[1]) };
			});
		}
		return result;
	}
}