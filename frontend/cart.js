window.addEventListener("load", () => {
  appenddata();
});
// js of cart//


async function appenddata() {
  try {
    let responsedata = await fetch("https://tiny-teal-pike-wig.cyclic.app/carts/get",{
      headers:{
          "Authorization":localStorage.getItem("token")
      }
    });

    let data = await responsedata.json();
    let datatoappend = data;
    append(datatoappend);
    cartTotal(datatoappend)
  } catch (err) {
    console.log(err);
  }
}


function append(data){
  document.querySelector("#main-container").innerHTML = null;
  document.querySelector("#toshow").innerText = `IN BAG(${data.length})`
  data.map(function (elem, index) {
      let div = document.createElement("div");
      let imgdiv = document.createElement("div");

      let image = document.createElement("img");
      image.setAttribute("src", elem.image);
      image.setAttribute("id","img")
      let divdata = document.createElement("div");
      divdata.setAttribute("id","divdata")
      let title=document.createElement("h3")
      title.innerText = elem.title
      let discount = document.createElement("p")
      let price=document.createElement("h3")
      price.innerText = `Price: $${elem.price}` 
      discount.innerText = elem.discount;
           
      let bottomdiv = document.createElement("div");
      bottomdiv.setAttribute("id","bottomdiv")

      let dec= document.createElement("button");
      dec.innerText = "-";
       dec.addEventListener("click",function(){
            decrement(elem._id)
      })

    let quantity = document.createElement("span");
    quantity.setAttribute("id","quant")
    quantity.innerText = elem.quantity;

    let inc = document.createElement("button");
    inc.innerText = "+";
    inc.addEventListener("click",function(){
            increment(elem._id)
    });
      let remove = document.createElement("button");
      remove.innerText = "Delete";
      remove.addEventListener("click", function () {
    
        removed(elem._id)
        
      });
      imgdiv.append(image)
      bottomdiv.append(dec,quantity,inc,remove)
       divdata.append(title,price,discount,bottomdiv)

      div.append(imgdiv,divdata);
      document.querySelector("#main-container").append(div);
  })
}


async function decrement(id){
      console.log(id)
  let responsedata = await fetch(`https://tiny-teal-pike-wig.cyclic.app/carts/dec/${id}`,{
      method:"PATCH",
      headers: {
          "Authorization":localStorage.getItem("token")
      }
      })
  
      let data = await responsedata.json()

  console.log(data)
  window.location.reload()



}



async function increment(id){
  console.log(id)
let responsedata = await fetch(`https://tiny-teal-pike-wig.cyclic.app/carts/inc/${id}`,{
  method:"PATCH",
  headers: {
      "Authorization":localStorage.getItem("token")
  }
  })

  let data = await responsedata.json()

console.log(data)
window.location.reload()



}


async function removed(id){

  let responsedata = await fetch(`https://tiny-teal-pike-wig.cyclic.app/carts/delete/${id}`,{
      method:"DELETE",
      headers: {
          "Authorization":localStorage.getItem("token")
      }
      })
  
      let data = await responsedata.json()
  
  console.log(data)
  alert(data.msg)
  window.location.reload()

}

function cartTotal(data){
let total = 0;
data.forEach(function(element,index){
total+=element.quantity*element.price;   
})
localStorage.setItem("total-price",total)
document.querySelector("#see").innerText = `$${total+5}.00`
document.querySelector("#seep").innerText = `$${total}.00`

}


document.querySelector("#pay").addEventListener("click",checkout)


function checkout(){
  window.location.href = "./payment.html"
}



document.querySelector("#cart").addEventListener("click",opencart)

function opencart(){
window.location.href = "./cart.html"
}

document.querySelector("#mens").addEventListener("click",openmens)

function openmens(){
window.location.href = "./men.html"}