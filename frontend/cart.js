window.addEventListener("load", () => {
    appenddata();
  });


  async function appenddata() {
    try {
        // api need ==http://localhost:8080/carts/get//
      let responsedata = await fetch("",{
        headers:{
            "Authorization":localStorage.getItem("token")
        }
      });
  
      let data = await responsedata.json();
      let datatoappend = data;
      append(datatoappend);
    } catch (err) {
      console.log(err);
    }
  }


  function append(data){
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
             


        let dec= document.createElement("button");
        dec.innerText = "-";
         dec.addEventListener("click",function(){
              decrement(elem._id)
        })
  
      let quantity = document.createElement("span");
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




        div.append(image,title,price,discount,dec,quantity,inc,remove);
        document.querySelector("#main-container").append(div);
    })
  }


  async function decrement(id){
        console.log(id)
        // api =`http://localhost:8080/carts/dec/${id}`//
    let responsedata = await fetch(``,{
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

    // api==`http://localhost:8080/carts/inc/${id}`

let responsedata = await fetch(``,{
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

    // api==`http://localhost:8080/carts/delete/${id}`
    let responsedata = await fetch(``,{
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