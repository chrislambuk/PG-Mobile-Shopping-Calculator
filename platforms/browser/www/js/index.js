document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
	// CREATE OBJECTS
	function Item(name, price) {
		this.name = name.toUpperCase();
		this.price = Number(price).toFixed(2);
	}

	function UI() {}
	// =======================================

	// CREATE EVENT LISTENERS
	getTotal();
	displayItems();
	document.getElementById('form-list').addEventListener('submit', function(e) {
		e.preventDefault();
		const name = document.getElementById('name').value;
		const name2 = name.toUpperCase();
		const price = document.getElementById('price').value;
		const price2 = Number(price).toFixed(2);
		const item = new Item(name, price);
		const ui = new UI();
		if (name === '' || price === '') {
			ui.showAlert('ENTER AN ITEM', 'alert animated bounceInDown');
		} else {
			const list = document.getElementById('item-list');
			const row = document.createElement('tr');
			row.innerHTML += `
    <td>${name2}</td>
    <td>${price2}</td>
    <td><a href="#" class="delete">-</a></td>
    `;
			list.appendChild(row);
			ui.showAlert('ADDED', 'alert animated bounceInDown');
			clearInputs();
			storeItems(item);
			getTotal();
		}
	});

	document.getElementById('item-list').addEventListener('click', function(e) {
		const ui = new UI();
		ui.deleteBook(e.target);
		ui.showAlert('DELETED', 'alert animated bounceInDown');
		e.preventDefault();
		getTotal();
	});

	// ============================================

	// CREATE PROTOYPES
	// ALERTS
	UI.prototype.showAlert = function(message, className) {
		const div = document.createElement('div');
		div.className = `${className}`;
		div.appendChild(document.createTextNode(message));
		const container = document.querySelector('.container');
		const form = document.getElementById('form');
		container.insertBefore(div, form);
		setTimeout(function() {
			document.querySelector('.alert').remove();
		}, 2000);
	};
	// DELETE ITEM
	UI.prototype.deleteBook = function(e) {
		if (e.classList.contains('delete')) {
			e.parentElement.parentElement.remove();
			deleteItemFromStorage(e);
			getTotal();
		}
	};
	// DELETE FROM STORAGE
	function deleteItemFromStorage(taskItem) {
		let items;
		if (localStorage.getItem('items') === null) {
			items = [];
		} else {
			items = JSON.parse(localStorage.getItem('items'));
		}
		// console.log(taskItem.parentElement.parentElement.firstElementChild.textContent)
		items.forEach(function(item, index) {
			// console.log(item.name)
			if (
				taskItem.parentElement.parentElement.firstElementChild.textContent ==
				item.name
			) {
				items.splice(index, 1);
			}
			getTotal();
		});
		localStorage.setItem('items', JSON.stringify(items));
	}

	// ===========================================
	// CREATE FUNCTIONS
	// LOCAL STORAGE
	function storeItems(item) {
		let items;
		if (localStorage.getItem('items') === null) {
			items = [];
		} else {
			items = JSON.parse(localStorage.getItem('items'));
		}
		items.push(item);
		localStorage.setItem('items', JSON.stringify(items));
	}
	function clearInputs() {
		document.getElementById('name').value = '';
		document.getElementById('price').value = '';
	}
	// GET TOTALS
	function getTotal() {
		let prices = JSON.parse(localStorage.getItem('items'));

		if (prices === null) {
			document.getElementById('total').innerHTML = `TOTAL: £ 0`;
		} else {
			let total = 0;
			for (i = 0; i < prices.length; i++) {
				total += parseFloat(prices[i].price);
			}
			final = total.toFixed(2);
			document.getElementById('total').innerHTML = `TOTAL: ${final}`;
		}
	}
	// DISPLAY ITEMS IN STORAGE
	function displayItems() {
		let items;
		if (localStorage.getItem('items') === null) {
			items = [];
		} else {
			items = JSON.parse(localStorage.getItem('items'));
		}
		items.forEach(function(item) {
			const list = document.getElementById('item-list');
			const row = document.createElement('tr');
			row.innerHTML += `
    <td>${item.name}</td>
    <td>${item.price}</td>
    <td><a href="#" class="delete">-</a></td>
    `;
			list.appendChild(row);
		});
	}

	// Set AdMobAds options:
	// admob.setOptions({
	// 	publisherId: 'ca-app-pub-8816517022745547/7951138830', // Required
	// });

	// admob.createBannerView();
}

var admobid = {};
	if (/(android)/i.test(navigator.userAgent)) {
		admobid = {
			// for Android
			banner: 'ca-app-pub-8816517022745547/4602167137'
			// interstitial: 'ca-app-pub-6869992474017983/1657046752'
		};
	} else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
		admobid = {
			// for iOS
			banner: 'ca-app-pub-8816517022745547/4602167137'
			// interstitial: 'ca-app-pub-6869992474017983/7563979554'
		};
	} else {
		admobid = {
			// for Windows Phone
			banner: 'ca-app-pub-8816517022745547/4602167137'
			// interstitial: 'ca-app-pub-6869992474017983/1355127956'
		};
	}
	
	function initApp() {
		if (AdMob) {
			AdMob.createBanner({
				adId: admobid.banner,
				position: AdMob.AD_POSITION.BOTTOM_CENTER,
				autoShow: true
			});
		}
	}
	document.addEventListener('deviceready', initApp, false);