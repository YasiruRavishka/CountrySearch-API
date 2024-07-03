fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    const tblCountries = document.getElementById("tblBody");

    let tblBody = ``;
    data.forEach((element) => {
      tblBody += `<tr onclick="searchResult('${element.name.common}')">
                    <td>${element.name.common}</td>
                    <td>${element.capital}</td>
                    <td><img src="${element.flags.png}" alt="${element.flags.alt}"></td>
                    <td><a href="${element.maps.googleMaps}"><i class="bi bi-geo-alt-fill text-danger"></i></a></td>
                  </tr>`;
    });
    tblCountries.innerHTML = tblBody;
  });

function searchCountry() {
  const searchValue = document.getElementById("txtSearchValue").value.toLowerCase();
  let tableRows = document.querySelectorAll("#tblBody tr");

  tableRows.forEach((row) => {
    const countryName = row.querySelector("td").innerHTML.toLowerCase();
    if (countryName.includes(searchValue)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

function searchResult(name) {
  fetch("https://restcountries.com/v3.1/name/" + name)
    .then((res) => res.json())
    .then((data) => {
      const searchResults = document.getElementById("searchResults");
      const officialName = document.getElementById("officialName");
      const capital = document.getElementById("capital");
      const img = document.getElementById("img");

      searchResults.style.backgroundColor = "whitesmoke";
      officialName.innerHTML = data[0].name.official;
      capital.innerHTML = data[0].capital;
      img.innerHTML = `<img class="img-fluid" src="${data[0].flags.png}" alt="${data[0].flags.alt}">`;
    });
}
