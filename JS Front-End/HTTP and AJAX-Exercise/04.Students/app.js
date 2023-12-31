async function attachEvents() {
  const baseUrl = "http://localhost:3030/jsonstore/collections/students";

  const [firstNameInput, lastNameInput, facultyNumber, grade] =
    document.querySelectorAll("input");
  const submitBtn = document.getElementById("submit");
  const tbody = document.querySelectorAll("tbody")[0];

  await load();

  submitBtn.addEventListener("click", async ()=> {
    if (
      firstNameInput.value != "" &&
      lastNameInput.value != "" &&
      facultyNumber.value != "" &&
      grade.value != ""
    ) {
      let student = {
        ["firstName"]: firstNameInput.value,
        ["lastName"]: lastNameInput.value,
        ["facultyNumber"]: facultyNumber.value,
        ["grade"]: grade.value,
      };

      await fetch(baseUrl, {
        method: "POST",
        body: JSON.stringify(student),
      });
    }

    await load();
  });

  async function load() {
    tbody.innerHTML = "";

    const response = await fetch(baseUrl);
    const students = await response.json();

    for (const [studentId, studentObj] of Object.entries(students)) {
      let tr = document.createElement("tr");

      let firstNameTh = document.createElement("td");
      firstNameTh.textContent = studentObj.firstName;
      tr.appendChild(firstNameTh);
      let lastNameTh = document.createElement("td");
      lastNameTh.textContent = studentObj.lastName;
      tr.appendChild(lastNameTh);
      let facultyNumberTh = document.createElement("td");
      facultyNumberTh.textContent = studentObj.facultyNumber;
      tr.appendChild(facultyNumberTh);
      let gradeTh = document.createElement("td");
      gradeTh.textContent = studentObj.grade.toString();
      tr.appendChild(gradeTh);

      tbody.appendChild(tr);
    }
  }
}

attachEvents();
