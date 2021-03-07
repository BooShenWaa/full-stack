console.log("running: ");

const characterMountNode = document.getElementById("container");

function renderCharacters(data) {
  const list = document.createElement("dl");
  // console.log(char["name"]

  data.forEach((char) => {
    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    const dd2 = document.createElement("dd");

    const charName = char["name"];
    const charLevel = char["level"];
    const charItems = char["items"];

    let weapon;

    charItems.forEach((item) => (weapon = item["weapon"]));

    // console.log(list);

    dt.innerHTML = `${charName}`;
    dd.innerHTML = `Level: ${charLevel}`;
    dd2.innerHTML = `Weapon: ${weapon}`;

    list.append(dt);
    list.append(dd);
    list.append(dd2);
  });

  characterMountNode.innerHTML = "";
  characterMountNode.append(list);
}

// TBC - fetch Function failing - Cross Orgin Access?
// Full error message:

//  Access to fetch at 'http://localhost:9000/api/v1/characters/' from origin 'http://127.0.0.1:5500' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

function getAllCharacters() {
  const all_charsURL = "http://localhost:9000/api/v1/characters/";

  fetch(all_charsURL, {
    method: "GET",
    // mode: "no-cors",
  })
    .then((response) => {
      return response.json();
    })

    .then((data) => {
      renderCharacters(data);
      console.log(data);
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
}

// let data = [
//   {
//     level: 2,
//     items: [{ weapon: "Spiral Shuriken" }],
//     _id: "6044ce2815164b0da31fe4f6",
//     name: "Yuffie",
//     HP: 21,
//     MP: 14,
//     __v: 0,
//   },
//   {
//     level: 2,
//     items: [{ weapon: "Buster Sword" }],
//     _id: "6044ced315164b0da31fe4f7",
//     name: "Cloud",
//     HP: 21,
//     MP: 14,
//     __v: 0,
//   },
//   {
//     level: 2,
//     items: [{ weapon: "Metal Knuckles" }],
//     _id: "6044d315662c430de89d37fe",
//     name: "Tifa",
//     HP: 21,
//     MP: 14,
//     __v: 0,
//   },
// ];

// console.log("trying to render:");
// renderCharacters(data);
// console.log(data);
getAllCharacters();
