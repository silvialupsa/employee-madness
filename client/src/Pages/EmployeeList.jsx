import { useEffect, useState} from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";

const fetchEmployees = () => {
  return fetch("/api/employees").then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);
  const [filteredEmployees, setFilteredEmployees] = useState(null);

  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  useEffect(() => {
    fetchEmployees().then((employees) => {
      setLoading(false);
      setEmployees(employees);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  const handleInput = (e) => {
    setFilteredEmployees(employees);
    e.preventDefault();
    setFilteredEmployees(
      employees.filter(
        (employee) =>
          employee.position
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          employee.level.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  // const handleSortButton = () => {
  
  // }


  return (
    <div>
      <input
        onChange={handleInput}
        placeholder="Search by position or level"
      ></input>
      <button>
        <i className="fa fa-sort-alpha-asc"></i> Sort by First Name
      </button>
      <button>
        <i className="fa fa-sort-alpha-desc"></i> Sort by First Name
      </button>
      <button>
        <i className="fa fa-sort-alpha-asc"></i> Sort by Last Name
      </button>
      <button>
        <i className="fa fa-sort-alpha-desc"></i> Sort by Last Name
      </button>
      <button>
        <i className="fa fa-sort-alpha-asc"></i> Sort by Middle Name
      </button>
      <button>
        <i className="fa fa-sort-alpha-desc"></i> Sort by Middle Name
      </button>
      <button>
        <i className="fa fa-sort-alpha-asc"></i> Sort by Position
      </button>
      <button>
        <i className="fa fa-sort-alpha-desc"></i> Sort by Position
      </button>
      <button>
        <i className="fa fa-sort-alpha-asc"></i> Sort by Level
      </button>
      <button>
        <i className="fa fa-sort-alpha-desc"></i> Sort by Level
      </button>
      <EmployeeTable
        employees={filteredEmployees ? filteredEmployees : employees}
        onDelete={handleDelete}
      />
      {console.log(filteredEmployees)}
    </div>
  );
};

export default EmployeeList;