// get shopping cart data from local storage:
document.querySelectorAll(".Total_Qte")[0].innerHTML   = (window.localStorage.getItem("Total Quantity") == null) ? 0    : window.localStorage.getItem("Total Quantity")
document.querySelectorAll(".Total_Price")[0].innerHTML = (window.localStorage.getItem("Total Price")    == null) ? "$0" : window.localStorage.getItem("Total Price")


// add selected items in the shopping cart to the web page body
if( window.localStorage.length < 3){
	document.querySelectorAll(".shopping_items_container")[0].innerHTML += `
	    <i class="fa-solid fa-cart-shopping"></i>
	    <h1>Shopping Cart Empty</h1>`;
	document.querySelectorAll(".shopping_items_container")[0][0]
}

else {
	for (let i =0; i < window.localStorage.length;i++){
	    if(window.localStorage.key(i) != "Total Price" && window.localStorage.key(i) != "Total Quantity" ){
            let item_obj = window.localStorage.getItem(window.localStorage.key(i));
            if (item_obj != null && JSON.parse(item_obj).quantity > 0){
        	    document.querySelectorAll(".shopping_items_container")[0].innerHTML += `
        	    <div class="game_item_shopping" id=${JSON.parse(item_obj).id}>	    
		            <img  class="image_game" src=${JSON.parse(item_obj).img}>
		            <span class="title_game">${JSON.parse(item_obj).name}</span>
		            <span class="game_price">${JSON.parse(item_obj).price}</span>
		            <div class="Basket_Qte">
		    	        <h3>Quantity in Shopping Cart:</h3>
		    	        <h3 class="item_Qte">${JSON.parse(item_obj).quantity}</h3>
		            </div>
			    <i class="fa-solid fa-xmark" onclick="remove_item()"></i>
	            </div>`;
	        }
	    }
	}
}



// remove item when x-icon is clicked
function remove_item(){
	console.log(event);

	let item_qte    = parseInt(event.target.parentElement.children[3].lastElementChild.innerHTML);
	let total_qte   = parseInt(document.querySelectorAll(".Total_Qte")[0].innerHTML) - item_qte;
	document.querySelectorAll(".Total_Qte")[0].innerHTML = total_qte;
	window.localStorage.setItem("Total Quantity",total_qte);              // update total quantity

	let item_price      = parseFloat(event.target.parentElement.children[2].innerHTML.substring(1)) * item_qte
	let total_price     = (parseFloat(document.querySelector(".Total_Price").innerHTML.substring(1)) -item_price ).toFixed(2);
	document.querySelector(".Total_Price").innerHTML     = `$${total_price}`;
        window.localStorage.setItem("Total Price",`$${total_price}`);           // update total price

	event.target.parentElement.remove();                                    // remove this item from the shopping cart web page
	window.localStorage.removeItem(event.target.parentElement.id);          // remove this item from local storage

};




// update store page when items are removed from shopping cart
window.addEventListener("storage",(event) =>{

	console.log(event);

	// capture event.key
	switch(event.key){
	        case "Total Quantity":
			document.querySelectorAll(".Total_Qte")[0].innerHTML   = event.newValue;
		        break;

	        case "Total Price":
                        document.querySelectorAll(".Total_Price")[0].innerHTML = event.newValue;
		        break;

                default:                                   // event.key is the product_id:
		        //each item removed from local storage must be also removed from shopping cart
		        if(window.localStorage.getItem(event.key) == null && document.getElementById(event.key) != null){
				document.getElementById(event.key).remove();
				break;
		        }


	                // update quantity of each item that exist in shopping cart
		        if(window.localStorage.getItem(event.key) != null && document.getElementById(event.key) != null){
			        document.getElementById(event.key).children[3].lastElementChild.innerHTML= JSON.parse(event.newValue).quantity;
				break;
	                }

	                // each item that exist in local storage must be added to shopping cart
		        if(window.localStorage.getItem(event.key) != null && document.getElementById(event.key) == null){
				document.querySelectorAll(".shopping_items_container")[0].innerHTML += `
        	                    <div class="game_item_shopping" id=${JSON.parse(event.newValue).id}>	    
		                         <img  class="image_game" src=${JSON.parse(event.newValue).img}>
		                         <span class="title_game">${JSON.parse(event.newValue).name}</span>
		                         <span class="game_price">${JSON.parse(event.newValue).price}</span>
		                         <div class="Basket_Qte">
		    	                     <h3>Quantity in Shopping Cart:</h3>
		    	                     <h3 class="item_Qte">${JSON.parse(event.newValue).quantity}</h3>
		                         </div>
			                 <i class="fa-solid fa-xmark" onclick="remove_item()"></i>
	                            </div>`;
			}
}
});



