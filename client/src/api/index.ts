import GradeFormValues from "../interfaces/GradeFormValues";

export async function getGradesFromBGU(values: GradeFormValues) {
  try {
    const requestUrl = `/grades/${values.year}/${values.semester}/${values.courseId}`;
    const response: Response = await fetch(requestUrl);

    if (response.ok) {
      const pdfData: string = await response.text();
      const blob: Blob = new Blob([pdfData], { type: "application/pdf" });
      const url: string = URL.createObjectURL(blob);
      window.open(url, "_blank");
    }

    return response.status;
  } catch (error) {
    console.log(error);
  }
}
