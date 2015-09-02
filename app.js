$(document).ready(function(){
	if (localStorage.length == 0)
	{
		localStorage["productBase"] = JSON.stringify([]);
		localStorage["favouriteBase"] = JSON.stringify([]);
	}
	else
		loadContent();
});
var myApp = new Framework7();
var $$ = Dom7;
var mainView = myApp.addView('.view-main', {
	dynamicNavbar: true
});

var productToEdit;

// comment for git

function addList ()
{
	console.log("addList");
	myApp.popup(createPopup("Создать продукт",true));
}

function loadContent()
{
	var productArray = JSON.parse(localStorage["productBase"]);
	var favouriteArray = JSON.parse(localStorage["favouriteBase"]);
	console.log(productArray);
	console.log(favouriteArray);
	for (var key in productArray)
	{
		if (productArray[key] == null)
			continue;
		var ul = document.getElementById("add-there");
		console.log(productArray[key]);
		ul.insertBefore(makeList(productArray[key], key, "productBase"), ul.children[1]);
	}
	for (var key in favouriteArray)
	{
		if (favouriteArray[key] == null)
			continue;
		console.log(favouriteArray[key]);
		var ul = document.getElementById("add-favourite-there");
		ul.insertBefore(makeList(favouriteArray[key], key, "favouriteBase"), ul.children[1]);
	}
	console.log("loadContent");
}

function makeList(product, key, base)
{
	console.log("makeList");
	var li = document.createElement("li");
	li.className = "swipeout";
	var div1 = document.createElement("div");
	div1.className = "item-content swipeout-content item-inner";
	var div2 = document.createElement("div");
	div2.className = "item-title";
	div1.appendChild(div2);
	console.log(product, "here is product to make");
	var text1 = document.createTextNode((product.name).toString());
	console.log(product.name, "Here is product name");
	div2.appendChild(text1);
	div2.id = key.toString() + " " + base + "div2";

	var div3 = document.createElement("div");
	div3.className = "swipeout-actions-right";
	var a1 = document.createElement("a");
	a1.href = "#";
	a1.className = "action1";
	var text2 = document.createTextNode("Изменить");
	a1.appendChild(text2);
	// a1.id = key.toString() + " " + base + " " + "a";
	a1.onclick = function(){
		var array = JSON.parse(localStorage[base]);
		myApp.popup(createPopup("Изменить продукт", false, key, base));
		console.log(array[key], key, "edit", base);
		document.getElementById('product-name').value = array[key].name;
		document.getElementById('protein-count').value = array[key].protein;
		document.getElementById('fats-count').value = array[key].fats;
		document.getElementById('carbohydrates-count').value = array[key].carbohydrates;
		document.getElementById('kilocalories-count').value = array[key].kilocalories;
		if (base == "favouriteBase")
			document.getElementById('is-favourite').checked = true;
		else
			document.getElementById('is-favourite').checked = false;
	}

	var a2 = document.createElement("a");
	a2.href = "#";
	a2.className = "action2 bg-red swipeout-delete";
	var text3 = document.createTextNode("Удалить");
	a2.appendChild(text3);
	a2.onclick = function(){
		//delete
		var array = JSON.parse(localStorage[base]);
		delete array[key];
		localStorage[base] = JSON.stringify(array);
	};
	div3.appendChild(a1);
	div3.appendChild(a2);

	var a = document.createElement("a");
	a.href = "#";
	a.className = "item-link";

	a.appendChild(div1);
	a.appendChild(div3);

	li.appendChild(a);
	li.id = key.toString() + " " + base;
	div2.onclick = function() {
		// product onclick
		myApp.popup(createPopup("Просмотр продукта", "pass"));
		var array = JSON.parse(localStorage[base]);
		product = array[key];

		// fill name form
		var name = document.getElementById("show-name");
		name.removeChild(name.lastChild);
		var elementName = document.createElement("h3");
		var Textname = document.createTextNode(product.name);
		elementName.appendChild(Textname);
		name.appendChild(elementName);

		//fill protein form
		var protein = document.getElementById("show-protein");
		protein.removeChild(protein.lastChild);
		var elementProtein = document.createElement("h3");
		var number = returnText(product.protein);
		var TextProtein = document.createTextNode(number);
		elementProtein.appendChild(TextProtein);
		protein.appendChild(elementProtein);
		// console.log(text);

		//fill fats form
		var fats = document.getElementById("show-fats");
		fats.removeChild(fats.lastChild);
		var elementFats = document.createElement("h3");
		var number = returnText(product.fats);
		var TextFats = document.createTextNode(number);
		elementFats.appendChild(TextFats);
		fats.appendChild(elementFats);
		// console.log(text);

		//fill carbohydrates form
		var carbohydrates = document.getElementById("show-carbohydrates");
		carbohydrates.removeChild(carbohydrates.lastChild);
		var elementCarbohydrates = document.createElement("h3");
		var number = returnText(product.carbohydrates);
		var TextCarbohydrates = document.createTextNode(number);
		elementCarbohydrates.appendChild(TextCarbohydrates);
		carbohydrates.appendChild(elementCarbohydrates);
		// console.log(text);

		//fill kilocalories form
		var kilocalories = document.getElementById("show-kilocalories");
		kilocalories.removeChild(kilocalories.lastChild);
		var elementKilocalories = document.createElement("h3");
		var number = returnText(product.kilocalories);
		var TextKilocalories = document.createTextNode(number);
		elementKilocalories.appendChild(TextKilocalories);
		kilocalories.appendChild(elementKilocalories);
		// console.log(text);
	};

	return li;
}

function returnText(number)
{
	return (number == null || isNaN(number)) ? "" : number;
}

var favouriteBase = "favouriteBase";
var productBase = "productBase";

function createPopup(createOrEdit, saveOnOK, key, base)
{
	console.log("createPopup");
	var popup = '<div class="popup">' +
					'<div class="navbar">' +
						'<div class="navbar-inner">' +
							'<div class="left">' +
								'<a href="#" class="link close-popup">x</a>' +
							'</div>' +
							'<div class="center">' +
								createOrEdit +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="content-block">' +
						'<div class="list-block">' +
							'<ul>' +
								'<li>' +
									'<div class="item-content">' +
										'<div class="item-inner" id="show-name">' +
											'<div class="item-title label"><h3>Название</h3></div>' +
											'<div class="item-input">' +
												'<input type="text" id="product-name">' +
											'</div>' +
										'</div>' +
									'</div>' +
								'</li>' +
								'<li>' +
									'<div class="item-content">' +
										'<div class="item-inner" id="show-protein">' +
											'<div class="item-title label"><h3>Белки</h3></div>' +
											'<div class="item-input">' +
												'<input type="text" id="protein-count">' +
											'</div>' +
										'</div>' +
									'</div>' +
								'</li>' +
								'<li>' +
									'<div class="item-content">' +
										'<div class="item-inner" id="show-fats">' +
											'<div class="item-title label"><h3>Жиры</h3></div>' +
											'<div class="item-input">' +
												'<input type="text" id="fats-count">' +
											'</div>' +
										'</div>' +
									'</div>' +
								'</li>' +
								'<li>' +
									'<div class="item-content">' +
										'<div class="item-inner" id="show-carbohydrates">' +
											'<div class="item-title label"><h3>Углеводы</h3></div>' +
											'<div class="item-input">' +
												'<input type="text" id="carbohydrates-count">' +
											'</div>' +
										'</div>' +
									'</div>' +
								'</li>' +
								'<li>' +
									'<div class="item-content">' +
										'<div class="item-inner" id="show-kilocalories">' +
											'<div class="item-title label"><h3>Калории</h3></div>' +
											'<div class="item-input">' +
												'<input type="text" id="kilocalories-count">' +
											'</div>' +
										'</div>' +
									'</div>' +
								'</li>'
								if (saveOnOK != "pass")
									popup +='<li>' +
												'<div class="item-content">' +
													'<div class="item-inner">' +
													'<div class="item-title label"><h3>Избранное</h3></div>' +
														'<div class="item-input">' +
															'<label class="label-switch">' +
																'<input type="checkbox" id="is-favourite">' +
																'<div class="checkbox"></div>' +
															'</label>'
														'</div>'
													'</div>' +
												'</div>' +
											'</li>'
							popup += '</ul>' +
							'<p><a href="#" class="button button-big close-popup"';
							console.log(key, base, saveOnOK);
							
							if (saveOnOK == true)
								popup += ' onclick="closeAndSave();"';
							else if (saveOnOK == false)
								popup += ' onclick="save(' + key.toString() + ', ' + base + ');"';
							// console.log(' onclick="save(' + key.toString() + ', ' + base + ');"');
							popup += '>OK</a></p>' +
						'</div>' +
					'</div>' +
				'</div>'
	return popup;
}

function save(key, base)
{
	console.log("change item");
	var name = document.getElementById('product-name').value;
	var protein = parseInt(document.getElementById('protein-count').value);
	var fats = parseInt(document.getElementById('fats-count').value);
	var carbohydrates = parseInt(document.getElementById('carbohydrates-count').value);
	var kilocalories = parseInt(document.getElementById('kilocalories-count').value);
	var favourite = document.getElementById('is-favourite').checked;
	var cur_product = new Product(name, protein, fats, carbohydrates, kilocalories);
	console.log(cur_product, "resave item");
	// var productArray = JSON.parse(localStorage["productBase"]);
	// var favouriteArray = JSON.parse(localStorage["favouriteBase"]);
	if (favourite)
	{
		if (base != "favouriteBase")
		{
			var productArray = JSON.parse(localStorage[base]);
			var favouriteArray = JSON.parse(localStorage["favouriteBase"]);
			delete productArray[key];
			favouriteArray.push(cur_product);
			var new_key = favouriteArray.length - 1;
			localStorage[base] = JSON.stringify(productArray);
			localStorage["favouriteBase"] = JSON.stringify(favouriteArray);

			var liID = key.toString() + " " + base;
			var list = document.getElementById(liID);
			var remove_product = document.getElementById('add-there');
			console.log(liID, list, remove_product, "remove from base (product)");
			list.remove();
			var ul = document.getElementById('add-favourite-there');
			ul.insertBefore(makeList(cur_product ,new_key, "favouriteBase"), ul.children[1]);

			return;
		}
	}
	else
	{
		if (base != "productBase")
		{
			var favouriteArray = JSON.parse(localStorage[base]);
			var productArray = JSON.parse(localStorage["productBase"]);
			delete favouriteArray[key];
			productArray.push(cur_product);
			var new_key = productArray.length - 1;
			localStorage["productBase"] = JSON.stringify(productArray);
			localStorage[base] = JSON.stringify(favouriteArray);

			var liID = key.toString() + " " + base;
			var list = document.getElementById(liID);
			var remove_fave = document.getElementById('add-favourite-there');
			console.log(liID, list, remove_fave, "remove from base (favourite)");
			list.remove();
			var ul = document.getElementById('add-there');
			ul.insertBefore(makeList(cur_product ,new_key, "productBase"), ul.children[1]);

			return;
		}
	}
	var array = JSON.parse(localStorage[base]);
	array[key] = cur_product;
	console.log(array, localStorage[base], array[key], cur_product, "check for resave")
	localStorage[base] = JSON.stringify(array);
	var divID = key.toString() + " " + base + "div2";
	var div = document.getElementById(divID);
	var textName = document.createTextNode(name);
	div.removeChild(div.firstChild);
	div.appendChild(textName);
}

function closeAndSave()
{
	console.log("closeAndSave");
	var name = document.getElementById('product-name').value;
	var protein = numberOrNothing(document.getElementById('protein-count').value);
	var fats = numberOrNothing(document.getElementById('fats-count').value);
	var carbohydrates = numberOrNothing(document.getElementById('carbohydrates-count').value);
	var kilocalories = numberOrNothing(document.getElementById('kilocalories-count').value);
	var favourite = document.getElementById('is-favourite').checked;
	if (name != "")
	{
		var cur_product = new Product(name, protein, fats, carbohydrates, kilocalories);
		var productArray = JSON.parse(localStorage["productBase"]);
		var favouriteArray = JSON.parse(localStorage["favouriteBase"]);
		if (favourite)
		{
			favouriteArray.push(cur_product);
			var new_key = favouriteArray.length - 1;
			var ul = document.getElementById("add-favourite-there");
			ul.insertBefore(makeList(cur_product, new_key, "favouriteBase"), ul.children[1]);
		}
		else
		{
			productArray.push(cur_product);
			var new_key = productArray.length - 1;
			var ul = document.getElementById("add-there");
			ul.insertBefore(makeList(cur_product, new_key, "productBase"), ul.children[1]);
		}
		localStorage["productBase"] = JSON.stringify(productArray);
		localStorage["favouriteBase"] = JSON.stringify(favouriteArray);
		console.log(JSON.parse(localStorage["productBase"]));
		console.log(JSON.parse(localStorage["favouriteBase"]));
	}
}

function numberOrNothing(tmp)
{
	return tmp == "" ? "" : parseInt(tmp);
}

//main class

function Product(name, protein, fats, carbohydrates, kilocalories)
{
	this.name = name;
	this.protein = protein;
	this.fats = fats;
	this.carbohydrates = carbohydrates;
	this.kilocalories = kilocalories;
}
