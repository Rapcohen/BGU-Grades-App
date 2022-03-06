import { LoadingButton } from "@mui/lab";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { ErrorMessage, Form, Formik } from "formik";
import React, { useState } from "react";
import { getGradesFromBGU } from "../api";
import GradeFormValues from "../interfaces/GradeFormValues";

const years: string[] = Array.from(new Array(10), (_, i) =>
  (new Date().getFullYear() - i).toString()
);
const semesters = ["1", "2", "3"];

interface Props {}

function validateForm(values: GradeFormValues) {
  const errors: Partial<GradeFormValues> = {};

  const courseIdRegex = /^[0-9]{3}-[1|2]-[0-9]{4}$/;
  if (!values.courseId.match(courseIdRegex)) {
    errors.courseId = "Invalid course number";
  }

  if (!years.includes(values.year)) {
    errors.year = "Invalid year";
  }

  if (!semesters.includes(values.semester)) {
    errors.year = "Invalid semester";
  }

  return errors;
}

export const GradeForm: React.FC<Props> = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onFormSubmit = async (values: GradeFormValues) => {
    setIsLoading(true);
    await getGradesFromBGU(values);
    setIsLoading(false);
  };

  return (
    <Formik
      initialValues={{ courseId: "", year: "", semester: "" }}
      validate={validateForm}
      onSubmit={onFormSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form>
          <TextField
            fullWidth
            autoComplete="off"
            margin="dense"
            name="courseId"
            type="text"
            label="Course Number"
            error={touched.courseId && Boolean(errors.courseId)}
            value={values.courseId}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          <ErrorMessage name="courseId" component="div" />
          <FormControl
            fullWidth
            margin="dense"
            error={touched.year && Boolean(errors.year)}
          >
            <InputLabel id="form-year-label">Year</InputLabel>
            <Select
              name="year"
              label="Year"
              labelId="form-year-label"
              value={values.year}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            >
              {years.map((year) => (
                <MenuItem value={year} key={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
            <ErrorMessage name="year" component="div" />
          </FormControl>
          <FormControl
            fullWidth
            margin="dense"
            error={touched.semester && Boolean(errors.semester)}
          >
            <InputLabel id="form-semester-label">Semester</InputLabel>
            <Select
              name="semester"
              label="Semester"
              labelId="form-semester-label"
              value={values.semester}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            >
              {semesters.map((semester) => (
                <MenuItem value={semester} key={semester}>
                  {semester}
                </MenuItem>
              ))}
            </Select>
            <ErrorMessage name="semester" component="div" />
          </FormControl>
          <FormControl fullWidth margin="dense">
            <LoadingButton
              type="submit"
              variant="contained"
              color="primary"
              loading={isLoading}
            >
              Get Grades
            </LoadingButton>
          </FormControl>
        </Form>
      )}
    </Formik>
  );
};
