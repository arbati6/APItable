class SortTable {
  constructor() {
    this.api = "https://dummyjson.com/products";
    this.td = document.querySelectorAll(".table__thead tr td");
    this.tbody = document.querySelector(".table__tbody");
    this.btnSortID = document.querySelector(".table__thead__btn--sort-id");
    this.btnSortRate = document.querySelector(".table__thead__btn--sort-rate");
    this.btnSortName = document.querySelector(".table__thead__btn--sort-name");
    this.lightBoxBg = document.querySelector(".lightbox-bg");

    this.sortNumbers = (column) => {
      this.tr = Array.from(document.querySelectorAll(".table__tbody tr"));
      this.tr[0].childNodes[column - 1].textContent >
      this.tr[this.tr.length - 1].childNodes[column - 1].textContent
        ? this.tr
            .sort(
              (a, b) =>
                a.childNodes[column - 1].textContent -
                b.childNodes[column - 1].textContent
            )
            .forEach((tr) => this.tbody.appendChild(tr))
        : this.tr
            .sort(
              (a, b) =>
                b.childNodes[column - 1].textContent -
                a.childNodes[column - 1].textContent
            )
            .forEach((tr) => this.tbody.appendChild(tr));
    };

    this.init();
  }

  init() {
    this.jsonStructure();
    //argument = column number
    this.sortById(1);
    this.sortByName(2);
    this.sortByRating(3);
  }

  async jsonStructure() {
    let fetchInit = await fetch(this.api);
    let json = await fetchInit.json();

    for (let item of json.products) {
      let colNum = [...this.td];
      let createTr = document.createElement("tr");
      this.tbody.appendChild(createTr);

      for (let td in colNum) {
        td = document.createElement("td");
        createTr.append(td);
      }

      let createImg = document.createElement("img");
      createImg.setAttribute("src", item.images[0]);
      createTr.children[0].innerText = item.id;
      createTr.children[1].innerText = item.title;
      createTr.children[2].innerText = item.rating;
      createTr.children[3].append(createImg);
      let createImg2 = document.createElement("span");
      createImg2.innerText = "🔍";
      createTr.children[3].append(createImg2);
    }

    const lightBox = () => {
      document.querySelectorAll("img").forEach((item) => {
        item.addEventListener("click", (e) => {
          let cloneImg = document.body.appendChild(e.target.cloneNode(true));
          cloneImg.classList.add("lightbox__img");
          this.lightBoxBg.style.display = "block";
          this.lightBoxBg.addEventListener("click", () => {
            this.lightBoxBg.style.display = "none";
            document.body.lastChild == cloneImg ? cloneImg.remove() : null;
          });
        });
      });
    };

    lightBox();
  }

  sortById(id) {
    this.btnSortID.addEventListener("click", () => this.sortNumbers(id));
  }

  sortByRating(id) {
    this.btnSortRate.addEventListener("click", () => this.sortNumbers(id));
  }

  sortByName(column) {
    this.btnSortName.addEventListener("click", () => {
      this.tr = Array.from(document.querySelectorAll(".table__tbody tr"));
      this.tr[0].childNodes[column - 1].textContent <=
      this.tr[this.tr.length - 1].childNodes[2].textContent
        ? this.tr
            .sort((a, b) => {
              return b.childNodes[column - 1].textContent.localeCompare(
                a.childNodes[column - 1].textContent,
                "en",
                { sensitivity: "base" }
              );
            })
            .forEach((tr) => this.tbody.appendChild(tr))
        : this.tr
            .sort((a, b) => {
              return a.childNodes[column - 1].textContent.localeCompare(
                b.childNodes[column - 1].textContent,
                "en",
                { sensitivity: "base" }
              );
            })
            .forEach((tr) => this.tbody.appendChild(tr));
    });
  }
}

const sortTable = new SortTable();