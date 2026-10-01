import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchAppointments = async () => {

      try {

       const token = localStorage.getItem("token");

const response = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/appointments`,
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);

        setAppointments(response.data.appointments);

      } catch (error) {

        console.error(error);

        setError("Unable to load appointments.");

      } finally {

        setLoading(false);

      }
    };

    fetchAppointments();

  }, []);

  return (
    <div className="dashboard-page">

      <div className="dashboard-container">

        <h1>Patient Dashboard</h1>

        <p>
          Manage your MediCare appointments.
        </p>

        <hr />

        <h2>My Appointments</h2>

        {loading && (
          <p>Loading appointments...</p>
        )}

        {error && (
          <p className="dashboard-error">
            {error}
          </p>
        )}

        {!loading &&
          !error &&
          appointments.length === 0 && (
            <div className="empty-appointments">

              <h3>No Appointments</h3>

              <p>
                You haven't booked any appointments yet.
              </p>

            </div>
          )}

        <div className="appointments-list">

          {appointments.map((appointment) => (

            <div
              className="appointment-card"
              key={appointment._id}
            >

              <div className="appointment-card-header">

                <h3>
                  {appointment.doctor}
                </h3>

                <span
                  className={`status ${appointment.status.toLowerCase()}`}
                >
                  {appointment.status}
                </span>

              </div>

              <p>
                <strong>Patient:</strong>{" "}
                {appointment.patientName}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {appointment.date}
              </p>

              <p>
                <strong>Time:</strong>{" "}
                {appointment.time}
              </p>

              <p>
                <strong>Reason:</strong>{" "}
                {appointment.reason}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;