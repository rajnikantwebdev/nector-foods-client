import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function App() {
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const userRole = localStorage.getItem("role");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/student/data`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setStudents(response.data.data || []);
        setMessage(response.data.message);
        setError("");
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching student data:", error);
        setError(
          error.response?.data?.message || "Failed to fetch student data"
        );
        setStudents([]);
      }
    };
    fetchStudentData();
  }, []);

  const handleDelete = async (rollNo, idx) => {
    if (
      !confirm(
        `Are you sure you want to delete student with Roll No: ${rollNo}?`
      )
    ) {
      return;
    }
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/student/${idx + 1}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if(response && response.status == 200) {
        alert("Student deleted successfully!")
      }
    } catch (error) {
      console.log("unable to delte user, try again later")
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Student Data</h1>
      {message && <p className="text-green-500 mb-4">{message}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {isLoading ? (<div>
        <span>hang on, we are fetching the data...</span>
      </div>) : students.length > 0 ? (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Roll No</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">College</th>
              <th className="border border-gray-300 px-4 py-2">Course</th>
              <th className="border border-gray-300 px-4 py-2">Marks</th>
              {userRole === "admin" && (
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  {student.roll_no}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {student.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {student.college}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {student.course}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {student.marks}
                </td>
                {userRole === "admin" && (
                  <td className="border text-center border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleDelete(student.roll_no ,index)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No student data available.</p>
      )}
    </div>
  );
}

export default App;