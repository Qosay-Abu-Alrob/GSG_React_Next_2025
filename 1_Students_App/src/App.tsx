import "./App.css";
import Main from "./screens/Main.screen";
import About from "./screens/About.screen";
import NotFound from "./screens/NotFound.screen";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import StudentDetails from "./screens/StudentDetails.screen";
import { useEffect, useReducer } from "react";
import useLocalStorage from "./hooks/local-storage.hook";
import { IStudent } from "./types";
import AddStudent from "./screens/AddStudent.screen";

type StudentAction =
  | { type: "SET_STUDENTS"; payload: IStudent[] }
  | { type: "ADD_STUDENT"; payload: IStudent }
  | { type: "REMOVE_FIRST" }
  | { type: "UPDATE_ABSENTS"; payload: { id: string; change: number } };

interface StudentState {
  studentsList: IStudent[];
  totalAbsents: number;
}

const initialState: StudentState = {
  studentsList: [],
  totalAbsents: 0,
};

const studentReducer = (
  state: StudentState,
  action: StudentAction
): StudentState => {
  switch (action.type) {
    case "SET_STUDENTS": {
      const totalAbsents = action.payload.reduce(
        (sum, student) => sum + student.absents,
        0
      );
      return { studentsList: action.payload, totalAbsents };
    }
    case "ADD_STUDENT": {
      const updatedList = [action.payload, ...state.studentsList];
      return {
        studentsList: updatedList,
        totalAbsents: state.totalAbsents + action.payload.absents,
      };
    }
    case "REMOVE_FIRST": {
      const updatedList = [...state.studentsList];
      const removedStudent = updatedList.shift();
      return {
        studentsList: updatedList,
        totalAbsents: state.totalAbsents - (removedStudent?.absents || 0),
      };
    }
    case "UPDATE_ABSENTS": {
      const updatedList = state.studentsList.map((student) =>
        student.id === action.payload.id
          ? { ...student, absents: student.absents + action.payload.change }
          : student
      );
      return {
        studentsList: updatedList,
        totalAbsents: state.totalAbsents + action.payload.change,
      };
    }
    default:
      return state;
  }
};

function App() {
  const h1Style = { color: "#69247C", fontSize: "24px" };
  const location = useLocation();

  const { storedData } = useLocalStorage([], "students-list");

  const [state, dispatch] = useReducer(studentReducer, initialState);

  useEffect(() => {
    const students = storedData || [];
    dispatch({ type: "SET_STUDENTS", payload: students });
  }, [storedData]);

  const handleAddStudent = (newStudent: IStudent) => {
    dispatch({ type: "ADD_STUDENT", payload: newStudent });
  };

  const handleRemoveFirst = () => {
    dispatch({ type: "REMOVE_FIRST" });
  };

  const handleAbsentChange = (id: string, change: number) => {
    dispatch({ type: "UPDATE_ABSENTS", payload: { id, change } });
  };

  return (
    <div className="main wrapper">
      <h1 style={h1Style}>Welcome to GSG React/Next Course</h1>
      <nav>
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>
          Home Page
        </Link>
        <Link
          to="/add"
          className={location.pathname === "/add" ? "active" : ""}
        >
          Add Student
        </Link>
        <Link
          to="/about"
          className={location.pathname === "/about" ? "active" : ""}
        >
          About App
        </Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <Main
              studentsList={state.studentsList}
              totalAbsents={state.totalAbsents}
              onAbsent={handleAbsentChange}
              onRemove={handleRemoveFirst}
            />
          }
        />
        <Route path="/add" element={<AddStudent onAdd={handleAddStudent} />} />
        <Route path="/about" element={<About />} />
        <Route path="/student/:id" element={<StudentDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
