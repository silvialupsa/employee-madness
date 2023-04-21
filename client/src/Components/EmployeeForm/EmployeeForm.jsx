import { useState, useEffect } from "react";

const EmployeeForm = ({ onSave, disabled, employee, onCancel }) => {
  const [equipments, setEquipments] = useState(null)
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

  useEffect(() => {
    fetchEquipments().then((equipments) => {
      setEquipments(equipments);
    });
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
          defaultValue={employee ? employee.level : null}
          name="level"
          id="level"
        />
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
