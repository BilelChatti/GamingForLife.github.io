
// get shopping cart data from local storage:
document.querySelectorAll(".Total_Qte")[0].innerHTML   = (window.localStorage.getItem("Total Quantity") == null) ? 0    : window.localStorage.getItem("Total Quantity")
document.querySelectorAll(".Total_Price")[0].innerHTML = (window.localStorage.getItem("Total Price")    == null) ? "$0" : window.localStorage.getItem("Total Price")


