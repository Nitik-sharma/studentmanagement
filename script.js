const submit = document.getElementById("submit");
const update = document.getElementById("UpDate");
function validation() {
  var Fname = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var age = document.getElementById("age").value;
  var degree = document.getElementById("degree").value;
  var Gpa = document.getElementById("GPA").value;

  if (Fname == "") {
    alert("Name is required");
    return false;
  }
  if (email == "") {
    alert("Email is required");
    return false;
  } else if (!email.includes("@")) {
    alert("Email is invalid");
    return false;
  }
  if (age == "") {
    alert("Age is required");
    return false;
  } else if (age < 1) {
    alert("Age must be Positive or not be zero");
    return false;
  }
  if (degree == "") {
    alert("Degree is required");
    return false;
  }
  if (Gpa == "") {
    alert("Gpa is required");
    return false;
  }

  return true;
}

const btn = document.getElementById("submit");

function showData() {
  var peopleList;
  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }

  var html = "";
  peopleList.forEach(function (element, index) {
    html += "<tr>";
    html += "<td>" + element.Fname + "</td>";
    html += "<td>" + element.email + "</td>";
    html += "<td>" + element.age + "</td>";
    html += "<td>" + element.degree + "</td>";
    html += "<td>" + element.Gpa + "</td>";
    html +=
      '<td><button onclick="deleteData(' +
      index +
      ')" class="btn btn-danger">Delete</button><button onclick="upDateData(' +
      index +
      ')" class="btn btn-warning m-2">Edit</button></td>';
    html += "</tr>";
  });
  document.querySelector("#curdTable tbody").innerHTML = html;
}

document.onload = showData();

function AddData() {
  if (validation() == true) {
    var Fname = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var age = document.getElementById("age").value;
    var degree = document.getElementById("degree").value;
    var Gpa = document.getElementById("GPA").value;

    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
      peopleList = [];
    } else {
      peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }
    peopleList.push({
      Fname: Fname,
      age: age,
      email: email,
      degree: degree,
      Gpa: Gpa,
    });
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("age").value = "";

    document.getElementById("degree").value = "";
    document.getElementById("GPA").value = "";
  }
}

// <----------Delete Data---------->

function deleteData(index) {
  var peopleList;
  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }
  peopleList.splice(index, 1);
  localStorage.setItem("peopleList", JSON.stringify(peopleList));
  showData();
}

// <----Edit Data------>

function upDateData(index) {
  submit.style.display = "none";
  update.style.display = "block";

  var peopleList;
  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }
  document.getElementById("name").value = peopleList[index].Fname;

  document.getElementById("email").value = peopleList[index].email;

  document.getElementById("age").value = peopleList[index].age;

  document.getElementById("degree").value = peopleList[index].degree;
  document.getElementById("GPA").value = peopleList[index].Gpa;

  update.addEventListener("click", () => {
    if (validation() == true) {
      peopleList[index].Fname = document.getElementById("name").value;

      peopleList[index].email = document.getElementById("email").value;

      peopleList[index].age = document.getElementById("age").value;

      peopleList[index].degree = document.getElementById("degree").value;

      peopleList[index].GPA = document.getElementById("GPA").value;

      localStorage.setItem("peopleList", JSON.stringify(peopleList));

      showData();

      document.getElementById("name").value = "";

      document.getElementById("email").value = "";
      document.getElementById("age").value = "";
      document.getElementById("degree").value = "";
      document.getElementById("GPA").value = "";
      submit.style.display = "block";
      update.style.display = "none";
    }
  });
}
