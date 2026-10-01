import { useState } from "react";
import axios from "axios";

function Appointment() {

  const [patientName, setPatientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");

  const [message, setMessage] = useState("");
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(false);

  const today = new Date()
    .toISOString()
    .split("T")[0];

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM"
  ];

  const handleSubmit = async (e) => {

    e.preventDefault();

    setMessage("");

    if (
      !patientName ||
      !email ||
      !phone ||
      !doctor ||
      !date ||
      !time ||
      !reason
    ) {
      setMessage("Please fill all the fields.");
      return;
    }

    try {

      setLoading(true);

     const token = localStorage.getItem("token");

const response = await axios.post(
 `${import.meta.env.VITE_API_URL}/api/appointments`,
  {
    patientName,
    email,
    phone,
    doctor,
    date,
    time,
    reason
  },
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);
      console.log("Backend response:", response.data);

      setAppointment(response.data.appointment);

    } catch (error) {

      console.error("Appointment error:", error);

      setMessage(
        error.response?.data?.message ||
        "Something went wrong. Please try again."
      );

    } finally {

      setLoading(false);

    }
  };

  // =========================
  // SUCCESS SCREEN
  // =========================

  if (appointment) {

    return (
      <div className="appointment-page">

        <div className="success-box">

          <h1>✅ Appointment Confirmed</h1>

          <p>
            Your appointment has been successfully saved.
          </p>

          <hr />

          <h2>Appointment Summary</h2>

          <p>
            <strong>Patient:</strong>{" "}
            {appointment.patientName}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {appointment.email}
          </p>

          <p>
            <strong>Phone:</strong>{" "}
            {appointment.phone}
          </p>

          <p>
            <strong>Doctor:</strong>{" "}
            {appointment.doctor}
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

          <p>
            <strong>Status:</strong>{" "}
            {appointment.status}
          </p>

          <button
            onClick={() => {

              setAppointment(null);

              setPatientName("");
              setEmail("");
              setPhone("");
              setDoctor("");
              setDate("");
              setTime("");
              setReason("");
              setMessage("");

            }}
          >
            Book Another Appointment
          </button>

        </div>

      </div>
    );
  }

  // =========================
  // APPOINTMENT FORM
  // =========================

  return (
    <div className="appointment-page">

      <div className="appointment-container">

        <div className="appointment-header">

          <h1>Book an Appointment</h1>

          <p>
            Schedule an appointment with one of our
            healthcare professionals.
          </p>

        </div>

        <form
          className="appointment-form"
          onSubmit={handleSubmit}
        >

          <h2>Patient Information</h2>

          <div className="form-group">

            <label>Patient Name</label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={patientName}
              onChange={(e) =>
                setPatientName(e.target.value)
              }
            />

          </div>

          <div className="form-row">

            <div className="form-group">

              <label>Email</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

            </div>

            <div className="form-group">

              <label>Phone Number</label>

              <input
                type="tel"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
              />

            </div>

          </div>

          <h2>Appointment Details</h2>

          <div className="form-group">

            <label>Select Doctor</label>

            <select
              value={doctor}
              onChange={(e) =>
                setDoctor(e.target.value)
              }
            >

              <option value="">
                -- Select Doctor --
              </option>

              <option value="Dr. Rahul Sharma - Cardiologist">
                Dr. Rahul Sharma - Cardiologist
              </option>

              <option value="Dr. Priya Patil - Dermatologist">
                Dr. Priya Patil - Dermatologist
              </option>

              <option value="Dr. Amit Kulkarni - Neurologist">
                Dr. Amit Kulkarni - Neurologist
              </option>

              <option value="Dr. Sneha Joshi - Pediatrician">
                Dr. Sneha Joshi - Pediatrician
              </option>

            </select>

          </div>

          <div className="form-group">

            <label>Appointment Date</label>

            <input
              type="date"
              min={today}
              value={date}
              onChange={(e) =>
                setDate(e.target.value)
              }
            />

          </div>

          <div className="form-group">

            <label>Select Time</label>

            <div className="time-selection">

              {timeSlots.map((slot) => (

                <button
                  type="button"
                  key={slot}
                  className={
                    time === slot
                      ? "time-slot selected"
                      : "time-slot"
                  }
                  onClick={() =>
                    setTime(slot)
                  }
                >
                  {slot}
                </button>

              ))}

            </div>

          </div>

          <div className="form-group">

            <label>Reason for Visit</label>

            <textarea
              rows="4"
              placeholder="Describe your reason for appointment"
              value={reason}
              onChange={(e) =>
                setReason(e.target.value)
              }
            />

          </div>

          {message && (
            <p className="form-message">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="book-button"
            disabled={loading}
          >
            {loading
              ? "Booking..."
              : "📅 Book Appointment"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default Appointment;