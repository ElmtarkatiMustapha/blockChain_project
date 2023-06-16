async function sendData() {
  let filiere = document.getElementById("filiere").value;
  await App.load();
  $.ajax({
    url: "/diplomes/deliveredMany",
    type: "POST",
    data: {
      filiere: filiere,
      account: App.account,
    },
    success: function (responseData) {
      console.log(responseData);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error("Error:", errorThrown);
    },
  });
}
async function deliveredOne(elem) {
  document.querySelector("body").classList.remove("loaded");
  const reference = elem.getAttribute("data-reference");
  const delivered = document.getElementById("delivered").value;
  const filiere = document.getElementById("filiere").value;
  let confirm = window.confirm("Voulez-vous vraiment délivrer ce diplome?");
  if (confirm) {
    if (delivered == "false") {
      await App.load();
      $.ajax({
        url: "/diplomes/deliveredOne",
        type: "POST",
        data: {
          filiere: filiere,
          reference: reference,
          account: App.account,
        },
        success: function (responseData) {
          console.log(responseData);
          location.reload();
        },
        error: function (jqXHR, textStatus, errorThrown) {
          document.querySelector("body").classList.add("loaded");
          console.error("Error:", errorThrown);
        },
      });
    }
  }
}
async function delivredAll() {
  document.querySelector("body").classList.remove("loaded");
  const filiere = document.getElementById("filiere").value;
  const year = document.getElementById("year").value;
  const delivered = document.getElementById("delivered").value;
  let confirme = window.confirm(
    "Voulez-vous vraiment délivrer toute la liste?"
  );
  if (confirme) {
    if (delivered == "false") {
      await App.load();
      $.ajax({
        url: "/diplomes/deliveredMany",
        type: "POST",
        data: {
          filiere: filiere,
          year: year,
          account: App.account,
        },
        success: function (responseData) {
          console.log(responseData);
          location.reload();
        },
        error: function (jqXHR, textStatus, errorThrown) {
          document.querySelector("body").classList.add("loaded");
          console.error("Error:", errorThrown);
        },
      });
    }
  }
}
function changeForm() {
  const form = document.getElementById("formSubmit");
  form.submit();
}
