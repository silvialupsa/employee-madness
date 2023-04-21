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
const brandsName = require("./brands.json")

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populateBrands = async () => {
  await BrandModel.deleteMany({});
  const brands = brandsName.map((name) => ({
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

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});
  const equipments = await EquipmentModel.find()
  const brands = await BrandModel.find()

  const employees = names.map((name) => ({
    present: false,
    name,
    level: pick(levels),
    position: pick(positions),
    equipment: pick(equipments),
    brand: pick(brands)
  }));

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateBrands()
  await populateEquipments()
  await populateEmployees();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
