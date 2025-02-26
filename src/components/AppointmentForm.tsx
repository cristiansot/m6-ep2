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
  const [appointments, setAppointments] = useState<AppointmentValues[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);

  useEffect(() => {
    const storedAppointments = getFromLocalStorage<AppointmentValues[]>("appointments") || [];
    setAppointments(storedAppointments);
  }, []);

  useEffect(() => {
    fetch("public/equipo.json")
      .then((response) => response.json())
      .then((data) => setDoctors(data))
      .catch((error) => console.error("Error al cargar los datos:", error));
  }, []);

  // Validación del formulario con Yup
  const validationSchema = Yup.object({
    patientName: Yup.string().required("El nombre del paciente es obligatorio"),
    doctor: Yup.string().required("Seleccionar un doctor es obligatorio"),
    appointmentDate: Yup.string().required("La fecha de la cita es obligatoria"),
  });

  const submitAppointment = (values: AppointmentValues) => {
    const newAppointment: AppointmentValues = { ...values };

    const isDuplicate = appointments.some(
      (appt) => appt.patientName === newAppointment.patientName && appt.appointmentDate === newAppointment.appointmentDate && appt.doctor === newAppointment.doctor
    );

    if (!isDuplicate) {
      const updatedAppointments = [...appointments, newAppointment];
      setAppointments(updatedAppointments);
      saveToLocalStorage("appointments", updatedAppointments); 
    } else {
      console.log("Esta cita ya está registrada.");
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

      <h3>Citas Agendadas</h3>
      <ul>
        {appointments.length > 0 ? (
          appointments.map((appt, index) => (
            <li key={index}>
              {appt.patientName} - {appt.doctor} - {appt.appointmentDate}
            </li>
          ))
        ) : (
          <li>No hay citas agendadas.</li>
        )}
      </ul>
    </div>
  );
};

export default AppointmentForm;
