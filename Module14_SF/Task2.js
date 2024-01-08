function Task2() {
  const jsonString = `
    {
        "list": [
        {
        "name": "Petr",
        "age": "20",
        "prof": "mechanic"
        },
        {
        "name": "Vova",
        "age": "60",
        "prof": "pilot"
        }
        ]
    }
    `;

  const data = JSON.parse(jsonString);

  // let nameNode = '';
  // let firstNode = '';
  // let secondNode = '';
  // let ageNode = '';
  // let profNode = '';
  // let langAttr = '';

  const people = [];

  data.list.forEach((el) => {
    people.push({ name: el.name, age: Number(el.age), prof: el.prof });
  });

  console.log("люди", people);
}
