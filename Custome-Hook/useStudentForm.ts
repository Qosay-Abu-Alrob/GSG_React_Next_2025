import { useState } from "react";
import { IStudent } from "../../types";
import { validateStudent } from "../../utils/validation.ts";

const INITIAL_STUDENT = {
  age: 0,
  coursesList: [],
  id: "",
  isGraduated: false,
  name: "",
  absents: 0,
};

export const useStudentForm = (onSubmit: (std: IStudent) => void) => {
  const [student, setStudent] = useState<IStudent>(INITIAL_STUDENT);
  const [errorsList, setErrorsList] = useState<string[]>([]);

  const handleChange = (field: string, value: any) => {
    setStudent({ ...student, [field]: value });
  };

  const handleSubmit = () => {
    const newStudent: IStudent = { ...student, id: Date.now().toString() };

    const errors = validateStudent(newStudent);
    if (errors.length > 0) {
      setErrorsList(errors);
    } else {
      setErrorsList([]);
      onSubmit(newStudent);
      handleClear();
    }
  };

  const handleClear = () => {
    setStudent(INITIAL_STUDENT);
  };

  const handleCoursesChange = (list: string[]) => {
    setStudent({ ...student, coursesList: list });
  };

  return {
    student,
    errorsList,
    handleChange,
    handleSubmit,
    handleClear,
    handleCoursesChange,
  };
};
