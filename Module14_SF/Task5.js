function pageLoaded() {
  const inputPage = document.querySelector("#input-51");
  const inputLimit = document.querySelector("#input-52");
  const btn = document.querySelector("#btn-5");
  const output = document.querySelector("#output-5");
  if (window.localStorage.getItem("prevResponse")) {
    const data = JSON.parse(window.localStorage.getItem("prevResponse"));
    writeOutput(formatOutput(data));
  }

  btn.addEventListener("click", sendRequest);

  function sendRequest() {
    if (validateTotal(inputPage.value, inputLimit.value)) {
      let xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        `https://picsum.photos/v2/list?page=${inputPage.value}&limit=${inputLimit.value}`
      );
      xhr.send();
      xhr.onerror = function () {
        writeOutput("При отправке запроса произошла ошибка");
      };
      xhr.onload = function () {
        if (xhr.status != 200) return;
        let data = JSON.parse(xhr.response);

        writeOutput(formatOutput(data));
        window.localStorage.setItem("prevResponse", xhr.response);
      };
    }
  }
  function writeOutput(message) {
    output.innerHTML = message;
  }
  function formatOutput(data) {
    let out = "";
    data.forEach((element) => {
      out += `
        <img src=${element.download_url} height="200px" width="200px" />
        `;
    });
    return out;
  }

  function validatePage(params) {
    let validated = true;
    if (params === "" || isNaN(+params) || params < 1 || params > 10) {
      writeOutput("Номер страницы вне диапазона от 1 до 10");
      validated = false;
    }
    return validated;
  }
  function validateLimit(params) {
    let validated = true;
    if (params === "" || isNaN(+params) || params < 1 || params > 10) {
      writeOutput("Лимит вне диапазона от 1 до 10");
      validated = false;
    }
    return validated;
  }
  function validateTotal(pageValue, limitValue) {
    firstval = validatePage(pageValue);
    secondval = validateLimit(limitValue);

    if (!firstval && !secondval) {
      writeOutput("Номер страницы и лимит вне диапазона от 1 до 10");
    }
    return firstval && secondval;
  }
}

document.addEventListener("DOMContentLoaded", pageLoaded);
