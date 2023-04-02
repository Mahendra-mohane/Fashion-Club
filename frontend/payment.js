document.querySelector("#pay").addEventListener("click",makepayment)


let totalprice = localStorage.getItem("total-price")
let total = +totalprice
document.querySelector("#see").innerText = `$${total+5}.00`
document.querySelector("#seep").innerText = `$${total}.00`
function makepayment(){
    // alert(`Purchase of $${total+5} Successful` )
    window.location.href = "./thank.html"
}
 
document.querySelector("#cart").addEventListener("click",opencart)

function opencart(){
  window.location.href = "./cart.html"
}

document.querySelector("#mens").addEventListener("click",openmens)

function openmens(){
  window.location.href = "./men.html"}
