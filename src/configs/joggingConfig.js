const joggingConfig = {
  arrayMonth: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  cities: [
    { id: 1, name: "Kyiv" },
    { id: 2, name: "Chisinau" },
    { id: 3, name: "Sumy" },
    { id: 4, name: "Poltava" }
  ],
  theadTable: [
    { title: "#", dataIndex: "id" },
    { title: "Date", dataIndex: "date" },
    { title: "Full distance", dataIndex: "distance" },
    { title: "Full time", dataIndex: "time" },
    { title: "City", dataIndex: "cityId" }
  ],
  theadTableSummary: [
    { title: "Description", dataIndex: "title" },
    { title: "Value", dataIndex: "value" }
  ],
  summaryTable: [
    { id: 1, title: "Count of Joggings : " },
    { id: 2, title: "Overcomed Distance : " },
    { id: 3, title: "Used time : " }
  ]
};

export default joggingConfig;
