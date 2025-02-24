import React, { useRef, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../assets/css/form.css";
import { useAuth } from "../context/AuthContext"; 

interface AppointmentFormProps {
  doctors: { nombre: string; especialidad: string }[];
  onAppointmentSubmit: (values: any) => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ doctors, onAppointmentSubmit }) => {
  const { token } = useAuth(); 
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitAppointment = async (values: any) => {
    try {
      setIsSubmitting(true);
      setApiResponse(null);

      const response = await fetch(`${process.env.REACT_APP_API_URL}/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        setApiResponse("Cita agendada exitosamente");
        onAppointmentSubmit(values);
      } else {
        const errorData = await response.json();
        setApiResponse(`Error: ${errorData.message || "No se pudo agendar la cita"}`);
      }
    } catch (error) {
      console.error("Error al enviar la cita:", error);
      setApiResponse("Error al conectar con el servidor");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="formContainer">
      <h2 style={{ marginTop: 40, padding: 20, color: "#5f6061" }}>Agendar Cita</h2>
      <Formik
        initialValues={{
          patientName: "",
          doctor: "",
          appointmentDate: "",
        }}
        validationSchema={Yup.object({
          patientName: Yup.string().required("El nombre del paciente es obligatorio"),
          doctor: Yup.string().required("Debes seleccionar un doctor"),
          appointmentDate: Yup.date().required("Debes seleccionar una fecha"),
        })}
        onSubmit={(values, { resetForm }) => {
          submitAppointment(values);
          resetForm();
        }}
      >
        {() => (
          <Form className="appointmentForm">
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AppointmentForm;