/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const EmployeeModel = require("../db/employee.model");
const EquipmentModel = require("../db/equipment.model")
const equipmentsName = require("./equipmentsName.json")
const equipmentsType = require("./equipmentsType.json")
const equipmentsAmount = require("./equipmentsAmount.json")
const mongoUrl = process.env.MONGO_URL;
const BrandModel = require("../db/brand.model") 
const brandsList = require("./brands.json")
const ColorModel = require("../db/color.model")
const colorsList = require("./colors.json")

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populateColors = async () => {
  await ColorModel.deleteMany({});
  const colors = colorsList.map((name) => ({
    name
  }));

  await ColorModel.create(...colors);
  console.log("Colors created");
};

//de ce daca schimb numele din map nu mi se face populate? ex: color 

const populateBrands = async () => {
  await BrandModel.deleteMany({});
  const brands = brandsList.map((name) => ({
    name
  }));

  await BrandModel.create(...brands);
  console.log("Brands created");
};

const populateEquipments = async () => {
  await EquipmentModel.deleteMany({});
  const equipments = equipmentsName.map((name) => ({
    name,
    type: pick(equipmentsType),
    amount: pick(equipmentsAmount),
  }));

  await EquipmentModel.create(...equipments);
  console.log("Equipments created");
};

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function choosePosSal(salary) {
  if (1 <= salary && salary <=100) {
    return "Junior"
  } else if (101 <= salary && salary <= 300) {
    return "Medior"
  } else if (301 <= salary && salary <= 400) {
    return "Senior"
  } else if (401 <= salary && salary <= 800) {
    return "Expert"
  } else if (801 <= salary) {
    return "Godlike"
  }
}

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});
  const equipments = await EquipmentModel.find()
  const brands = await BrandModel.find()
  const colors = await ColorModel.find()

  const employees = names.map((name) => ({
    present: false,
    name,
    position: pick(positions),
    equipment: pick(equipments),
    brand: pick(brands),
    color: pick(colors),
    salary: randomIntFromInterval(1, 1500)
  }));
  employees.map((employee) => employee.level = choosePosSal(employee.salary))

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateColors()
  await populateBrands()
  await populateEquipments()
  await populateEmployees();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
