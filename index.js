(() => {
  "use strict";

  const form = document.querySelector(".needs-validation");

  form.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        event.stopPropagation();
        form.classList.add("was-validated");
        return;
      }

      const grossIncome =
        parseFloat(document.getElementById("grossIncome").value) || 0;
      const extraIncome =
        parseFloat(document.getElementById("extraIncome").value) || 0;
      const ageGroup = document.getElementById("floatingSelect").value;
      const deductions =
        parseFloat(document.getElementById("incomeDeductions").value) || 0;

      let overallIncome = grossIncome + extraIncome - deductions;
      if (overallIncome > 800000) {
        let taxRate = 0.3;
        if (ageGroup === "2") {
          taxRate = 0.4;
        } else if (ageGroup === "3") {
          taxRate = 0.1;
        }
        overallIncome -= 800000;
        overallIncome *= taxRate;
      }

      const modalBody = document.querySelector(".modal-body");
      modalBody.textContent = `Your Overall Income is ₹${overallIncome.toFixed(
        2
      )}`;

      const modal = new bootstrap.Modal(document.getElementById("resultModal"));
      modal.show();

      form.classList.remove("was-validated");
    },
    false
  );

  const numberInputs = document.querySelectorAll(".number-input");
  numberInputs.forEach((input) => {
    input.addEventListener("input", () => {
      validateInput(input);
    });
  });

  function validateInput(input) {
    const invalidTooltip =
      input.parentElement.querySelector(".invalid-tooltip");
    const value = input.value;
    if (!value.match(/^\d+$/)) {
      invalidTooltip.style.display = "block";
    } else {
      invalidTooltip.style.display = "none";
    }
  }

  var inputFields = document.querySelectorAll(
    'input[data-bs-toggle="tooltip"]'
  );
  inputFields.forEach(function (input) {
    new bootstrap.Tooltip(input);
    input.addEventListener("click", function () {
      input.focus();
    });
  });
})();
