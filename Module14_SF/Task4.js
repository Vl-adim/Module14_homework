function pageLoaded() {
  const input = document.querySelector("#input-4");
  const btn = document.querySelector("#btn-4");
  const output = document.querySelector("#output-4");

  btn.addEventListener("click", sendRequest);

  function sendRequest() {
    const width = input.value.split(" ")[0];
    const height = input.value.split(" ")[1];

    if (validateInput(width) && validateInput(height)) {
      fetch(`https://picsum.photos/${width}/${height}`).then((response) => {
        writeOutput(formatOutput(response.url));
      });
    }
  }
  function writeOutput(message) {
    output.innerHTML = message;
  }
  function formatOutput(data) {
    return `<img src=${data} />`;
  }

  function validateInput(dimensions) {
    let validated = true;
    if (
      dimensions === "" ||
      isNaN(+dimensions) ||
      dimensions < 100 ||
      dimensions > 300
    ) {
      writeOutput("одно из чисел вне диапазона от 100 до 300");
      validated = false;
    }
    return validated;
  }
}

document.addEventListener("DOMContentLoaded", pageLoaded);
