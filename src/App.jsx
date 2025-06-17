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
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[80vh] rounded-lg">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-t-blue-600 border-gray-200"></div>
            <p className="mt-4 text-lg text-gray-600 font-medium">
              take a water break...
            </p>
          </div>
        </div>
      ) : students.length > 0 ? (
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
                      onClick={() => handleDelete(student.roll_no, index)}
                      className="text-red-500 px-2 py-1 rounded hover:text-red-700 cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
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