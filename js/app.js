// Variables
const form = document.querySelector("#agregar-gasto");
const expensesList = document.querySelector("#gastos ul");

// Events
addEventListeners();
function addEventListeners() {
  document.addEventListener("DOMContentLoaded", AskForBudget);
  form.addEventListener("submit", addExpense);
}

// Classes
class Budget {
  constructor(budget) {
    this.budget = Number(budget);
    this.rest = Number(budget);
    this.expenses = [];
  }

  newExpense(newExpense) {
    this.expenses = [...this.expenses, newExpense];
    this.calculateRest();
  }

  calculateRest() {
    const expensesTotal = this.expenses.reduce((total, expense) => {
      return total + expense.expenseAmount;
    }, 0);
    this.rest = this.budget - expensesTotal;
  }

  removeExpense(id) {
    this.expenses = this.expenses.filter(
      (expense) => expense.id != id && expense.id != id
    );
    this.calculateRest();
  }
}

class UI {
  addBudget(budgetObject) {
    const { budget, rest } = budgetObject;
    document.querySelector("#total").textContent = budget;
    document.querySelector("#restante").textContent = rest;
  }

  showAlert(msg, type) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("text-center", "alert");
    msgDiv.textContent = msg;
    if (type === "error") {
      msgDiv.classList.add("alert-danger");
    } else {
      msgDiv.classList.add("alert-success");
    }

    document.querySelector(".primario").insertBefore(msgDiv, form);

    setTimeout(() => {
      msgDiv.remove();
    }, 3000);
  }

  showExpenses(expenses) {
    this.clearHTML();
    expenses.forEach((expense) => {
      const { expenseAmount, expenseName, id } = expense;

      const expenseLi = document.createElement("li");
      expenseLi.className =
        "list-group-item d-flex justify-content-between align-items-center";
      expenseLi.dataset.id = id;
      expenseLi.innerHTML = `
      ${expenseName} <span class="badge badge-primary badge-pill">$${expenseAmount}</span>
        `;

      const deleteBtn = document.createElement("a");
      deleteBtn.innerHTML = "Borrar &times";
      deleteBtn.classList.add("btn", "btn-danger", "borrar-gasto");
      deleteBtn.onclick = () => {
        removeExpense(id);
      };

      expenseLi.appendChild(deleteBtn);
      expensesList.appendChild(expenseLi);
    });
  }

  clearHTML() {
    while (expensesList.firstChild) {
      expensesList.removeChild(expensesList.firstChild);
    }
  }
  updateRest(rest) {
    document.querySelector("#restante").textContent = rest;
  }
  checkBudget(budgetObj) {
    const { budget, rest } = budgetObj;
    const restDiv = document.querySelector(".restante");
    if (budget / 4 > rest) {
      restDiv.classList.remove("alert-success", "alert-warning");
      restDiv.classList.add("alert-danger");
    } else if (budget / 2 >= rest) {
      restDiv.classList.remove("alert-success");
      restDiv.classList.add("alert-warning");
    } else {
      restDiv.classList.remove("alert-danger", "alert-warning");
      restDiv.classList.add("alert-success");
    }

    if (rest <= 0) {
      ui.showAlert("El presupuesto se ha agotado.", "error");
      form.querySelector('button[type="submit"]').disabled = true;
    }
  }
}

const ui = new UI();

let budget;

// Functions
function AskForBudget() {
  let userBudget = 800;
  while (
    userBudget === "" ||
    typeof userBudget === "string" ||
    isNaN(userBudget) ||
    userBudget <= 0
  ) {
    userBudget = parseFloat(prompt("¿Cual es tú presupuesto?"));
  }
  //   console.log(typeof userBudget);
  //   console.log(userBudget);
  budget = new Budget(userBudget);
  console.log(budget);
  ui.addBudget(budget);
}

function addExpense(e) {
  e.preventDefault();

  const expenseName = document.querySelector("#gasto").value;
  const expenseAmount = Number(document.querySelector("#cantidad").value);
  if (expenseName === "" || expenseAmount === "") {
    ui.showAlert("Ambos campos son obligatorios.", "error");
    return;
  } else if (expenseAmount <= 0 || isNaN(expenseAmount)) {
    ui.showAlert("Cantidad inválida.", "error");
    return;
  }

  const expense = {
    expenseAmount,
    expenseName,
    id: Date.now(),
  };
  budget.newExpense(expense);
  ui.showAlert("Gasto agregado correctamente.");

  const { expenses, rest } = budget;
  ui.showExpenses(expenses);
  ui.updateRest(rest);
  ui.checkBudget(budget);
  form.reset();
}

function removeExpense(id) {
  budget.removeExpense(id);
  const { expenses, rest } = budget;
  ui.showExpenses(expenses);
  ui.updateRest(rest);
  ui.checkBudget(budget);
}
