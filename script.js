document.addEventListener("DOMContentLoaded", () => {
  let cyphers = Array.from(document.getElementsByClassName("cifra"));

  let operations = Array.from(document.getElementsByClassName("operation"));

  const operationsContainer = document.getElementsByClassName("operaciones")[0];

  const cyphersContainer =
    document.getElementsByClassName("cifras-container")[0];

  const operationsContainerScroll = document.getElementsByClassName(
    "operaciones-container"
  )[0];

  const cyphersButtonsContainer = document.getElementsByClassName("cifras")[0];

  function enableOperationButtons(operations) {
    /*
        Enables the buttons that contain the operation symbols
        */
    operations.forEach((operationButton) => {
      operationButton.disabled = false;
    });
  }

  function disableCypherButtons(cyphers) {
    /*
        Disables the buttons that contain the six cyphers
        */
    cyphers.forEach((button) => {
      button.disabled = true;
    });
  }

  function enableCypherButtons(cyphers) {
    /*
    Enables the buttons that contain the six cyphers
    */
    cyphers.forEach((button) => {
      if (!button.classList.contains("selected-cypher"))
        button.disabled = false;
    });
  }

  function disableOperationButtons(operations) {
    /*
        Disables the buttons that contain the operation symbols
        */
    operations.forEach((operationButton) => {
      operationButton.disabled = true;
    });
  }

  function deselect(type) {
    cyphers.forEach((button) => {
      if (button.classList.contains("selected-cypher") && type == "correct") {
        cyphersButtonsContainer.removeChild(button);
      }
      button.classList.remove("selected-cypher");
    });

    operations.forEach((operationButton) => {
      operationButton.classList.remove("selected-operation");
    });
  }

  disableOperationButtons(operations);

  let cifra1 = null;
  let op = null;
  let cifra2 = null;

  function evaluateExpression() {
    if (cifra1 != null && cifra2 != null && op != null) {
      if (eval(op) >= 1 && parseInt(eval(op)) == eval(op)) {
        const expression = `${op}`;
        const result = eval(expression);
        console.log(`Expression obtained: ${result}`);
        const resultButton = document.createElement("button");
        resultButton.classList.add("cifra");
        resultButton.innerHTML = result;
        resultButton.style.animation = "appear .5s ease";
        cyphersButtonsContainer.appendChild(resultButton);
        const resultElement = document.createElement("div");
        resultElement.classList.add("operacion");
        resultElement.innerHTML = `${cifra1} ${op[7]} ${cifra2} = ${result}`;
        resultElement.style.animation = "appear .5s ease";
        operationsContainerScroll.appendChild(resultElement);
        cyphersContainer.style.transform = "translateY(-20vh)";
        operationsContainer.style.transform = "translateY(20vh)";
        operationsContainer.style.opacity = "1";
        deselect("correct");
        enableCypherButtons(cyphers);
        disableOperationButtons(operations);
        game();
      } else {
        deselect("incorrect");
        enableCypherButtons(cyphers);
        game();
      }
    }
  }
  function game() {
    cifra1 = null;
    cifra2 = null;
    op = null;
    console.log(cifra1, op, cifra2);
    cyphers = Array.from(document.getElementsByClassName("cifra"));
    const handleCypherClick = (cypherButton) => {
      if (cifra1 === null) {
        cifra1 = parseInt(cypherButton.innerHTML, 10);
        cypherButton.classList.add("selected-cypher");
        disableCypherButtons(cyphers);
        enableOperationButtons(operations);
        console.log(cifra1, op, cifra2);
      } else if (cifra2 === null) {
        cifra2 = parseInt(cypherButton.innerHTML, 10);
        cypherButton.classList.add("selected-cypher");
        disableCypherButtons(cyphers);
        evaluateExpression();
        console.log(cifra1, op, cifra2);
      }
    };

    const handleOperationClick = (operationButton) => {
      op = operationButton.innerHTML;
      const iconToString = () => {
        if (op.includes("fa-plus")) {
          return "cifra1 + cifra2";
        } else if (op.includes("fa-minus")) {
          return "cifra1 - cifra2";
        } else if (op.includes("fa-xmark")) {
          return "cifra1 * cifra2";
        } else if (op.includes("fa-divide")) {
          return "cifra1 / cifra2";
        }
      };

      op = iconToString();
      operationButton.classList.add("selected-operation");
      disableOperationButtons(operations);
      enableCypherButtons(cyphers);
      if (cifra1 !== null && cifra2 !== null && op !== null) {
        evaluateExpression();
      }
    };

    // Agregar el event listener a cada botón de cifra
    cyphers.forEach((cypherButton) => {
      cypherButton.addEventListener("click", () =>
        handleCypherClick(cypherButton)
      );
    });

    // Agregar el event listener a cada botón de operación
    operations.forEach((operationButton) => {
      operationButton.addEventListener("click", () =>
        handleOperationClick(operationButton)
      );
    });
  }
  game();
});
