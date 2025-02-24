import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../assets/css/form.css";
import { useAuth } from "../context/AuthContext";

interface Doctor {
  nombre: string;
  especialidad: string;
}

interface AppointmentValues {
  patientName: string;
  doctor: string;
  appointmentDate: string;
}

interface AppointmentFormProps {
  onAppointmentSubmit: (values: AppointmentValues) => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ onAppointmentSubmit }) => {
  const { token } = useAuth();
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    fetch("src/assets/equipo.json")
      .then((response) => response.json())
      .then((data) => setDoctors(data))
      .catch((error) => console.error("Error al cargar los datos:", error));
  }, []);

  const validationSchema = Yup.object({
    patientName: Yup.string().required("El nombre del paciente es obligatorio"),
    doctor: Yup.string().required("Debes seleccionar un doctor"),
    appointmentDate: Yup.date().required("Debes seleccionar una fecha"),
  });

  const submitAppointment = async (values: AppointmentValues) => {
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
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          submitAppointment(values);
          resetForm();
        }}
      >
        {() => (
          <Form className="appointmentForm">
            <div>
              <label className="titleLabel" htmlFor="patientName">
                Nombre del Paciente
              </label>
              <Field type="text" id="patientName" name="patientName" placeholder="Nombre completo" />
              <ErrorMessage name="patientName" component="div" className="errorMessage" />
            </div>

            <div>
              <label className="titleLabel" htmlFor="doctor">
                Seleccionar Doctor
              </label>
              <Field as="select" id="doctor" name="doctor">
                <option value="">Seleccionar doctor</option>
                {doctors.map((doc, index) => (
                  <option key={index} value={doc.nombre}>
                    {doc.nombre} ({doc.especialidad})
                  </option>
                ))}
              </Field>
              <ErrorMessage name="doctor" component="div" className="errorMessage" />
            </div>

            <div>
              <label className="titleLabel" htmlFor="appointmentDate">
                Fecha de la Cita
              </label>
              <Field type="date" id="appointmentDate" name="appointmentDate" />
              <ErrorMessage name="appointmentDate" component="div" className="errorMessage" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Agendar"}
            </button>

            {apiResponse && (
              <div
                style={{
                  marginTop: 20,
                  color: apiResponse.startsWith("Error") ? "red" : "green",
                }}
              >
                {apiResponse}
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AppointmentForm;