import { Link, useActionData, useEffect } from "react-router-dom";
import "./EmployeeTable.css";

const EmployeeTable = ({
  employees,
  onDelete,
  handleAttendance,
  handleAscOrDesc,
}) => (
  <div className="EmployeeTable">
    <table>
      <thead>
        <tr>
          <th>Present</th>
          <th>
            <Link to={`/name/asc`}>
              <button onClick={handleAscOrDesc}>
                <i
                  className="fa fa-sort-alpha-asc"
                  style={{ color: "red" }}
                ></i>
              </button>
            </Link>
            <Link to={`/name/desc`}>
              <button onClick={handleAscOrDesc}>
                <i
                  className="fa fa-sort-alpha-desc"
                  style={{ color: "red" }}
                ></i>
              </button>
            </Link>
            Name
          </th>
          <th>
            <Link to={`/level/asc`}>
              <button onClick={handleAscOrDesc}>
                <i
                  className="fa fa-sort-alpha-asc"
                  style={{ color: "red" }}
                ></i>
              </button>
            </Link>
            <Link to={`/level/desc`}>
              <button onClick={handleAscOrDesc}>
                <i
                  className="fa fa-sort-alpha-desc"
                  style={{ color: "red" }}
                ></i>
              </button>
            </Link>
            Level
          </th>
          <th>
            <Link to={`/position/asc`}>
              <button onClick={handleAscOrDesc}>
                <i
                  className="fa fa-sort-alpha-asc"
                  style={{ color: "red" }}
                ></i>
              </button>
            </Link>
            <Link to={`/position/desc`}>
              <button onClick={handleAscOrDesc}>
                <i
                  className="fa fa-sort-alpha-desc"
                  style={{ color: "red" }}
                ></i>
              </button>
            </Link>
            Position
          </th>
          <th>
            <Link
              to={`/equipment/asc`}
            >
              <button onClick={handleAscOrDesc}>
                <i
                  className="fa fa-sort-alpha-asc"
                  style={{ color: "red" }}
                ></i>
              </button>
            </Link>
            <Link to={`/equipment/desc`}>
              <button onClick={handleAscOrDesc}>
                <i
                  className="fa fa-sort-alpha-desc"
                  style={{ color: "red" }}
                ></i>
              </button>
            </Link>
            Equipment
          </th>
          <th>
            <Link to={`/brand/asc`}>
              <button onClick={handleAscOrDesc}>
                <i
                  className="fa fa-sort-alpha-asc"
                  style={{ color: "red" }}
                ></i>
              </button>
            </Link>
            <Link to={`/brand/desc`}>
              <button onClick={handleAscOrDesc}>
                <i
                  className="fa fa-sort-alpha-desc"
                  style={{ color: "red" }}
                ></i>
              </button>
            </Link>
            Brand
          </th>
          <th>
            <Link to={`/color/asc`}>
              <button onClick={handleAscOrDesc}>
                <i
                  className="fa fa-sort-alpha-asc"
                  style={{ color: "red" }}
                ></i>
              </button>
            </Link>
            <Link to={`/color/desc`}>
              <button onClick={handleAscOrDesc}>
                <i
                  className="fa fa-sort-alpha-desc"
                  style={{ color: "red" }}
                ></i>
              </button>
            </Link>
            Favorite color
          </th>
          <th>
            <Link to={`/salary/asc`}>
              <button onClick={handleAscOrDesc}>
                <i
                  className="fa fa-sort-alpha-asc"
                  style={{ color: "red" }}
                ></i>
              </button>
            </Link>
            <Link to={`/salary/desc`}>
              <button onClick={handleAscOrDesc}>
                <i
                  className="fa fa-sort-alpha-desc"
                  style={{ color: "red" }}
                ></i>
              </button>
            </Link>
            Salary
          </th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee._id}>
            <td>
              <input
                type="checkbox"
                onChange={() => handleAttendance(employee)}
                defaultChecked={employee.present}
              />
            </td>
            <td>{employee.name}</td>
            <td>{employee.level}</td>
            <td>{employee.position}</td>
            <td>{employee.equipment.name}</td>
            <td>{employee.brand.name}</td>
            <td>{employee.color.name}</td>
            <td>{employee.salary}</td>
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
