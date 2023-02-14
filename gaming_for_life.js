
// change border on mouseover & mouseleave events
let game_items = document.querySelectorAll("div.game_item");
let old_borders = [];
for (let i = 0; i < game_items.length;i++){
	game_items[i].style.border = "medium solid darkgrey";
	old_borders[i]             = game_items[i].style.border;
	game_items[i].addEventListener("mouseover",()=>{
        game_items[i].style.border = "medium solid #00FFFF";
    });
    game_items[i].addEventListener("mouseleave",()=>{
        game_items[i].style.border = old_borders[i];
    });
}



// get shopping cart data from local storage:
document.querySelectorAll(".Total_Qte")[0].innerHTML   = (window.localStorage.getItem("Total Quantity") == null) ? 0    : window.localStorage.getItem("Total Quantity")
document.querySelectorAll(".Total_Price")[0].innerHTML = (window.localStorage.getItem("Total Price")    == null) ? "$0" : window.localStorage.getItem("Total Price")
for (let i =0; i < window.localStorage.length;i++){
    if(window.localStorage.key(i) != "Total Price" && window.localStorage.key(i) != "Total Quantity" ){
         let item_obj = window.localStorage.getItem(window.localStorage.key(i));
	 document.getElementById(JSON.parse(item_obj).id).lastElementChild.lastElementChild.innerHTML= JSON.parse(item_obj).quantity;
    }
}



// add items to shopping cart
let add_buttons    = document.querySelectorAll("input.add_button_item");
for (let i = 0; i < add_buttons.length; i++){
    add_buttons[i].addEventListener("click",()=>{
    
    // Update Quantity of Items in Shopping Cart
    let Item_Qte    = add_buttons[i].parentElement.children[5].children[1].innerHTML;
    Item_Qte        = parseInt(Item_Qte) + 1;                              // The parseInt() function parses a string argument and returns an integer
    add_buttons[i].parentElement.children[5].children[1].innerHTML = Item_Qte;


    // Update Total Qte
    let Total_Qte   = document.querySelectorAll(".Total_Qte")[0].innerHTML;
    Total_Qte       = parseInt(Total_Qte) + 1;
    document.querySelectorAll(".Total_Qte")[0].innerHTML = Total_Qte;

    // Update Total Price
	let Total_Price = document.querySelectorAll(".Total_Price")[0].innerHTML;
	Total_Price     = Total_Price.substring(Total_Price.indexOf("$")+1);
	Total_Price     = parseFloat(Total_Price);
	let price       = add_buttons[i].parentElement.children[2].innerHTML;     // get item price
	price           = parseFloat(price.substring(1));                         // convert price to float
	Total_Price    += price;
	document.querySelectorAll(".Total_Price")[0].innerHTML = `$${Total_Price.toFixed(2)}`;

	// update shopping cart in local storage:
	window.localStorage.setItem("Total Quantity",Total_Qte);
	window.localStorage.setItem("Total Price",`$${Total_Price.toFixed(2)}`);

	let shopping_item = {};
	shopping_item.id        = add_buttons[i].parentElement.id                                              // get item id
	shopping_item.img       = add_buttons[i].parentElement.children[0].src;                                // get image source
	shopping_item.name      = add_buttons[i].parentElement.children[1].innerHTML;                          // get item name
	shopping_item.price     = add_buttons[i].parentElement.children[2].innerHTML;                          // get item price
	shopping_item.quantity  = add_buttons[i].parentElement.children[5].children[1].innerHTML;              // get item quantity in shopping cart
	window.localStorage.setItem(shopping_item.id,JSON.stringify(shopping_item));                           // add the JSON object to local storage
    	  	
    }); 
}


// remove items from shopping cart
let remove_buttons = document.querySelectorAll("input.remove_button_item");
for (let i = 0; i < remove_buttons.length; i++){
    remove_buttons[i].addEventListener("click",()=>{
    	let Item_Qte    = remove_buttons[i].parentElement.children[5].children[1].innerHTML;
    	Item_Qte        = parseInt(Item_Qte);                                      // The parseInt() function parses a string argument and returns an integer
    	
    	if (Item_Qte > 0){

    		// Update Quantity of Items in Shopping Cart
    		Item_Qte       -= 1;
    		remove_buttons[i].parentElement.children[5].children[1].innerHTML = Item_Qte;

    		// Update Total Qte
            let Total_Qte   = document.querySelectorAll(".Total_Qte")[0].innerHTML;
            Total_Qte       = parseInt(Total_Qte) - 1;
            document.querySelectorAll(".Total_Qte")[0].innerHTML = Total_Qte;

    		// Update Total Price
	        let Total_Price = document.querySelectorAll(".Total_Price")[0].innerHTML;
	        Total_Price     = Total_Price.substring(Total_Price.indexOf("$")+1);
	        Total_Price     = parseFloat(Total_Price);
	        let price       = remove_buttons[i].parentElement.children[2].innerHTML;     // get item price
	        price           = parseFloat(price.substring(1));                            // convert price to float
	        Total_Price    -= price;
	        document.querySelectorAll(".Total_Price")[0].innerHTML = `$${Total_Price.toFixed(2)}`;

	        // update shopping cart in local storage:
	        window.localStorage.setItem("Total Quantity",Total_Qte);
	        window.localStorage.setItem("Total Price",`$${Total_Price.toFixed(2)}`);
	        
	        let shopping_item = {};
	        shopping_item.id        = remove_buttons[i].parentElement.id                                              // get item id
	        shopping_item.img       = remove_buttons[i].parentElement.children[0].src;                                // get image source
	        shopping_item.name      = remove_buttons[i].parentElement.children[1].innerHTML;                          // get item name
	        shopping_item.price     = remove_buttons[i].parentElement.children[2].innerHTML;                          // get item price
	        shopping_item.quantity  = remove_buttons[i].parentElement.children[5].children[1].innerHTML;              // get item quantity in shopping cart
	        window.localStorage.setItem(shopping_item.id,JSON.stringify(shopping_item));                              // add the JSON object to local storage
	   }

	   if (Item_Qte == 0){
	   	   window.localStorage.removeItem(remove_buttons[i].parentElement.id); 
	   }


    }) 
}



// update store page when items are removed from shopping cart
window.addEventListener("storage",(event) =>{
	if(event.key == "Total Quantity"){
	       document.querySelectorAll(".Total_Qte")[0].innerHTML   = event.newValue;}
	else if(event.key == "Total Price"){
               document.querySelectorAll(".Total_Price")[0].innerHTML = event.newValue;}
	else{
	       document.getElementById(event.key).lastElementChild.lastElementChild.innerHTML= 0;
	}
});


