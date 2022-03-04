import React from "react"
import useForm from "../custom_hooks/useForm";

interface FormProps { }

interface FormValues { 
    courseId: string,
    year: number,
    semester: number,
}

const initialInputs = {
  courseId: "",
  year: 0,
  semester: 0,
}

const Form: React.FC<FormProps> = () => {

  const { inputs, handleInputChange, handleSubmit } = useForm<FormValues>(initialInputs, getGrades);

  async function getGrades(): Promise<void> {
    try {
      const requestUrl = `/grades/${inputs.year}/${inputs.semester}/${inputs.courseId}`;
      const response: Response = await fetch(requestUrl);
      if (response.ok) {
        const pdfData: string = await response.text();
        const blob: Blob = new Blob([pdfData], { type: "application/pdf" });
        const url: string = URL.createObjectURL(blob);
        window.open(url, "_blank");
        return;
      }
      alert(`Error: ${response.statusText}`);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Course Number
          <input type="text" name="courseId" onChange={handleInputChange} required />
        </label>
      </div>
      <div>
        <label>
          Year
          <input type="number" name="year" onChange={handleInputChange} required />
        </label>
      </div>
      <div>
        <label>
          Semester
          <input type="number" name="semester" onChange={handleInputChange} required />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
