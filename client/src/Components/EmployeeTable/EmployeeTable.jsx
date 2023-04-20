import { Link, useActionData, useEffect } from "react-router-dom";
import "./EmployeeTable.css";

const EmployeeTable = ({ employees, onDelete, handleAttendance }) => (
  <div className="EmployeeTable">
    <table>
      <thead>
        <tr>
          <th>Attendance</th>
          <th>Name</th>
          <th>Level</th>
          <th>Position</th>
          <th>Equipment</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee._id}>
            <input type="checkbox"
              checked={employee.present}
              onChange={handleAttendance}
            />
            <td>{employee.name}</td>
            <td>{employee.level}</td>
            <td>{employee.position}</td>
            <td>{employee.equipment.name}</td>
            <td>
              <Link to={`/update/${employee._id}`}>
                <button type="button">Update</button>
              </Link>
              <button type="button" onClick={() => onDelete(employee._id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default EmployeeTable;
