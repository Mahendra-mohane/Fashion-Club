window.addEventListener("load", () => {
  appenddata();
});
// js//

async function appenddata() {
  try {
    // fetch data of mens/get here ex=  fetch("http://localhost:8080/mens/get")//
    let responsedata = await fetch("https://tiny-teal-pike-wig.cyclic.app/mens/get");

    let data = await responsedata.json();
    let datatoappend = data;
    append(datatoappend);
  } catch (err) {
    console.log(err);
  }
}

function append(data) {
  document.querySelector("#main-container").innerHTML = null;
  data.map(function (elem, index) {
    let div = document.createElement("div");
    let image = document.createElement("img");
    image.setAttribute("src", elem.image);
    image.setAttribute("id","img")
    let title=document.createElement("h3")
    title.innerText = elem.title
    let discount = document.createElement("p")
    let price=document.createElement("h3")
    price.innerText = `$${elem.price}` 
    discount.innerText = elem.discount;
    let addtocart = document.createElement("button")
    addtocart.innerText = "ADD TO CART"
    addtocart.addEventListener("click",function(){
            cart(elem,index)
        })
    div.append(image,title,price,discount,addtocart);
    document.querySelector("#main-container").append(div);
  });
}

function cart(elem,index){
    console.log(elem,index)
}
document.querySelector("#filter").addEventListener("change",myfilter)
document.querySelector("#filterbyprice").addEventListener("change",filterit)

function myfilter(){
  let selected = document.querySelector("#filter").value

  if(selected == "lowtohigh"){
    lowtohigh()
  }
  if(selected =="hightolow"){
   hightolow()
  }

}

async function lowtohigh(){

  // fetch api for filter ex=http://localhost:8080/mens/getbyprice?price=1//
  
    let responsedata = await fetch("https://tiny-teal-pike-wig.cyclic.app/mens/getbyprice?price=1")
  
    let data = await responsedata.json()
    append(data)
   }
  
  async function hightolow(){
    // fetch api for filter  ex=http://localhost:8080/mens/getbyprice?price=-1

    let responsedata = await fetch("https://tiny-teal-pike-wig.cyclic.app/mens/getbyprice?price=-1")
  
    let data = await responsedata.json()
    append(data)
   
  }
  function filterit(){
    let selected = document.querySelector("#filterbyprice").value
  let a;
  let b;
    if(selected == "0to50"){
      a=0;
      b=50;
    }
    if(selected =="50to100"){  
    a = 50;
    b = 100;
    }
    if(selected =="100to150"){
    a = 100;
    b = 150;
    }
    if(selected =="150to200"){
    a = 150;
    b = 200;
    }
  
    filterfunc(a,b)
  }
  
  async function filterfunc(a=0,b=200){
   console.log(a,b)
  //  api== `http://localhost:8080/mens/filteredprice?price=${a}&price=${b}`
    let responsedata = await fetch(`https://tiny-teal-pike-wig.cyclic.app/mens/filteredprice?price=${a}&price=${b}`)
  
    let data = await responsedata.json()
    append(data)
  }

  async function cart(payload,index){
    payload.quantity=1
       
    // api=="http://localhost:8080/carts/addtocart"
  let responsedata = await fetch("https://tiny-teal-pike-wig.cyclic.app/carts/addtocart",{

  method:"POST",
  headers:{
    "Content-type":"application/json",
    "Authorization":localStorage.getItem("token")
  },
  body:JSON.stringify(payload)
  })

    let data = await responsedata.json()
  
    alert(data.msg)
    console.log(data)
  }

  document.querySelector("#cart").addEventListener("click",opencart)

  function opencart(){
    window.location.href = "./cart.html"
  }

  document.querySelector("#mens").addEventListener("click",openmens)

  function openmens(){
    window.location.href = "./men.html"}