let students = localStorage.getItem("students") ? JSON.parse(localStorage.getItem("students")) : [
  {
    id: 100,
    name: "Nurmuhammad",
    lastName: "Mahmudov",
    mark: 140.5,
    markedDate: new Date("2021-12-05")
  },
  {
    id: 101,
    name: "Asadbek",
    lastName: "Asadov",
    mark: 146,
    markedDate: new Date("2021-12-06")
  },
  {
    id: 102,
    name: "Ahmadjon",
    lastName: "Hasanjanov",
    mark: 75,
    markedDate: new Date("2021-12-01")
  },
  {
    id: 103,
    name: "G'anivoy",
    lastName: "Teshayev",
    mark: 40,
    markedDate: new Date("2021-12-05")
  },
  {
    id: 104,
    name: "Kamronbek",
    lastName: "Zoirov",
    mark: 150,
    markedDate: new Date("2022-03-29")
  }
]
