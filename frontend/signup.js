let form = document.querySelector("#form");
form.addEventListener("submit", getUserData);

async function getUserData(event) {
  event.preventDefault();

  const payload = {
    email: form.email.value,
    password: form.password.value,
    phone: form.phone.value,
    name: `${form.f_name.value} ${form.l_name.value}`,
  };

  if (
    payload.email == "" ||
    payload.password == "" ||
    payload.phone == "" ||
    payload.name == ""
  ) {
    alert("Please fill all fields");
  } else {
    // user register api need to fetch //

    

      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    let data = await responsedata.json();

    alert(data.msg);
    window.location.href = "./index.html";
  }
}


