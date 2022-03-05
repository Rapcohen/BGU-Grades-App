import React from "react";
import { Button, TextField } from "@mui/material";
import { ErrorMessage, Form, Formik } from "formik";
import GradeFormValues from "../interfaces/GradeFormValues";


interface Props {
    onSubmit: (values: GradeFormValues) => void;
}

function validateForm(values: GradeFormValues) {
    const errors: Partial<GradeFormValues> = {};
    // TODO: add courseId validation

    // TODO: extend year validation
    if (parseInt(values.year) > new Date().getFullYear()) {
        errors.year = "Year must be less than or equal to current year";
    }

    // TODO: add courseId validation

    return errors;
}

export const GradeForm: React.FC<Props> = ({ onSubmit }) => {
    return (
        <Formik
            initialValues={{ courseId: "", year: "", semester: "" }}
            validate={validateForm}
            onSubmit={onSubmit}
        >
            {({ values, errors, touched, handleChange, handleBlur }) => (
                <Form>
                    <div>
                        <TextField
                            name="courseId"
                            type="text"
                            label="Course Number"
                            value={values.courseId}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                        />
                        <ErrorMessage name="courseId" />
                    </div>
                    <div>
                        <TextField
                            name="year"
                            type="number"
                            label="Year"
                            value={values.year}
                            error={errors.year !== undefined}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                        />
                        <ErrorMessage name="year" />
                    </div>
                    <div>
                        <TextField
                            name="semester"
                            type="number"
                            label="Semester"
                            value={values.semester}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                        />
                        <ErrorMessage name="semester" />
                    </div>
                    <Button type="submit">Submit</Button>
                </Form>
            )}
        </Formik>
    );
};
