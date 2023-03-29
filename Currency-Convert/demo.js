let dropdowns = document.querySelectorAll(".currency");
let convertbutton = document.querySelector("#btn");
let input = document.querySelector("#input");
let result = document.querySelector("#result");
let error = document.querySelector(".error");
let error2 = document.querySelector(".error2");
let currencylist = document.querySelector(".currency-list");

fetch("https://api.frankfurter.app/currencies")
  .then((resolve) => {
    return resolve.json();
  })
  .then((value) => {
    addtodropdown(value);
  });

function addtodropdown(value) {
  let currencies = Object.entries(value);
  currencies.map((value) => {
    let addingcurrency = `<option value=${value[0]}>${value[0]}</option>`;
    dropdowns[0].innerHTML += addingcurrency;
    dropdowns[1].innerHTML += addingcurrency;
  });
}

convertbutton.addEventListener("click", () => {
  let fromvalue = dropdowns[0].value;
  let tovalue = dropdowns[1].value;
  let inputvalue = input.value;

  if (fromvalue === tovalue) {
    error.classList.add("show");
  } else if (input.value === "") {
    error2.classList.add("show");
  } else {
    makeconversion(fromvalue, tovalue, inputvalue);
  }
});

function makeconversion(fromvalue, tovalue, inputvalue) {
  const host = "api.frankfurter.app";
  fetch(
    `https://${host}/latest?amount=${inputvalue}&from=${fromvalue}&to=${tovalue}`
  )
    .then((resp) => resp.json())
    .then((data) => {
      result.value = Object.values(data.rates)[0];
    });
}

fetch("https://api.frankfurter.app/currencies")
  .then((resolve) => {
    return resolve.json();
  })
  .then((value) => {
    let makearray = Object.entries(value);
    makearray.map((data) => {
      let countryname = `<li class="listof-currency">${`${data[0]}"   =>   "${data[1]}`}}</li>`;
      currencylist.innerHTML += countryname;
    });
  });
