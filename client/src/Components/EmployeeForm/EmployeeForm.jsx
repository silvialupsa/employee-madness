import { useState, useEffect } from "react";
import { useActionData } from "react-router-dom";

const EmployeeForm = ({
  onSave,
  disabled,
  employee,
  onCancel,
}) => {
  const [equipments, setEquipments] = useState(null);
  const [brands, setBrands] = useState(null);
  const [colors, setColors] = useState(null);
  const [salaryInput, setSalaryInput] = useState(null)
  const [level, setLevel] = useState(null)

  function changeLevel(salary) {
    if (1 <= salary && salary <= 100) {
      setLevel("Junior")
      console.log(level)
    } else if (101 <= salary && salary <= 300) {
      setLevel("Medior")
      console.log(level);
    } else if (301 <= salary && salary <= 400) {
      setLevel("Senior")
      console.log(level);
    } else if (401 <= salary && salary <= 800) {
      setLevel("Expert")
      console.log(level);
    } else if (801 <= salary) {
      setLevel("Godlike")
      console.log(level);
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = [...formData.entries()];

    const employee = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, {});

    return onSave(employee);
  };

  const fetchEquipments = () => {
    return fetch("/api/equipments/").then((res) => res.json());
  };

  const fetchBrands = () => {
    return fetch("/api/brands/").then((res) => res.json());
  };

  const fetchColors = () => {
    return fetch("/api/colors/").then((res) => res.json());
  };

  useEffect(() => {
    fetchEquipments().then((equipments) => {
      setEquipments(equipments);
    });
    fetchBrands().then((brands) => {
      setBrands(brands);
    });
    fetchColors().then((colors) => {
      setColors(colors);
    });
    changeLevel(salaryInput)
  }, []);

  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      {employee && (
        <input type="hidden" name="_id" defaultValue={employee._id} />
      )}

      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          defaultValue={employee ? employee.name : null}
          name="name"
          id="name"
        />
      </div>

      <div className="control">
        <label htmlFor="level">Level:</label>
        <input 

        defaultValue={level ? level : employee.level}
        name="level" id="level" />
      </div>

      <div className="control">
        <label htmlFor="position">Position:</label>
        <input
          defaultValue={employee ? employee.position : null}
          name="position"
          id="position"
        />
      </div>

      <div className="control">
        <label htmlFor="equipment">Equipment:</label>
        <select name="equipment" id="equipment">
          <option value="" selected={true} hidden="disabled">
            Select an Equipment...
          </option>
          {equipments?.map((equipment) => {
            return (
              <option
                selected={employee?.equipment._id === equipment._id}
                key={equipment._id}
                value={equipment._id}
              >
                {equipment.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="control">
        <label htmlFor="brand">Brand:</label>
        <select name="brand" id="brand">
          <option value="" selected={true} hidden="disabled">
            Select a Brand...
          </option>
          {brands?.map((brand) => {
            return (
              <option
                selected={employee?.brand._id === brand._id}
                key={brand._id}
                value={brand._id}
              >
                {brand.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="control">
        <label htmlFor="color">Color:</label>
        <select name="color" id="color">
          <option value="" selected={true} hidden="disabled">
            Select a Color...
          </option>
          {colors?.map((color) => {
            return (
              <option
                selected={employee?.color._id === color._id}
                key={color._id}
                value={color._id}
              >
                {color.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="control">
        <label htmlFor="salary">Salary:</label>
        <input
          onChange={(e) => { console.log(e.target.value); setSalaryInput(e.target.value) }}
          defaultValue={employee ? employee.salary : null}
          name="salary"
          id="salary"
        />
      </div>

      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {employee ? "Update Employee" : "Create Employee"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
