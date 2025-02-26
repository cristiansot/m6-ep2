import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { saveToLocalStorage, getFromLocalStorage } from "../utils/localStorageUtils";
import * as Yup from "yup";
import "../assets/css/form.css";

interface AppointmentValues {
  patientName: string;
  doctor: string;
  appointmentDate: string;
}

const AppointmentForm: React.FC = () => {
  const [appointments, setAppointments] = useState<AppointmentValues | null>(null);
  const [doctors, setDoctors] = useState<any[]>([]);

  useEffect(() => {
    fetch("public/equipo.json")
      .then((response) => response.json())
      .then((data) => setDoctors(data))
      .catch((error) => console.error("Error al cargar los datos:", error));
  }, []);

  const validationSchema = Yup.object({
    patientName: Yup.string().required("El nombre del paciente es obligatorio"),
    doctor: Yup.string().required("Seleccionar un doctor es obligatorio"),
    appointmentDate: Yup.string().required("La fecha de la cita es obligatoria"),
  });

  const submitAppointment = (values: AppointmentValues) => {
    const newAppointment: AppointmentValues = { ...values };

    const storedAppointments = getFromLocalStorage<AppointmentValues[]>("appointments") || [];
    const updatedAppointments = [...storedAppointments, newAppointment];
    saveToLocalStorage("appointments", updatedAppointments);
    setAppointments(newAppointment);
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
        {({ isSubmitting }) => (
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
          </Form>
        )}
      </Formik>

      <h3>Cita Agendada</h3>
      {appointments ? (
        <ul>
          <li>
            {appointments.patientName} - {appointments.doctor} - {appointments.appointmentDate}
          </li>
        </ul>
      ) : (
        <p>No hay citas agendadas.</p>
      )}
    </div>
  );
};

export default AppointmentForm;
