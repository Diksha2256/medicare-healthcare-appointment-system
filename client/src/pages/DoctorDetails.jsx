import { useParams, Link } from "react-router-dom";
import { useState } from "react";

function DoctorDetails() {

  const { id } = useParams();

  const [selectedTime, setSelectedTime] = useState("");

  const doctors = [
    {
      id: 1,
      name: "Dr. Rahul Sharma",
      specialization: "Cardiologist",
      experience: 10,
      qualification: "MBBS, MD Cardiology",
      fee: 500,
      about:
        "Experienced cardiologist specializing in heart health and cardiovascular care.",
      availability: [
        "10:00 AM",
        "11:00 AM",
        "02:00 PM",
        "04:00 PM"
      ]
    },
    {
      id: 2,
      name: "Dr. Priya Patil",
      specialization: "Dermatologist",
      experience: 7,
      qualification: "MBBS, MD Dermatology",
      fee: 400,
      about:
        "Dermatologist providing treatment and consultation for skin and hair conditions.",
      availability: [
        "09:00 AM",
        "11:00 AM",
        "01:00 PM",
        "03:00 PM"
      ]
    },
    {
      id: 3,
      name: "Dr. Amit Kulkarni",
      specialization: "Neurologist",
      experience: 12,
      qualification: "MBBS, DM Neurology",
      fee: 600,
      about:
        "Neurologist specializing in diagnosis and management of neurological conditions.",
      availability: [
        "10:00 AM",
        "12:00 PM",
        "03:00 PM",
        "05:00 PM"
      ]
    },
    {
      id: 4,
      name: "Dr. Sneha Joshi",
      specialization: "Pediatrician",
      experience: 8,
      qualification: "MBBS, MD Pediatrics",
      fee: 450,
      about:
        "Pediatrician focused on children's health, growth and preventive care.",
      availability: [
        "09:30 AM",
        "11:30 AM",
        "02:30 PM",
        "04:30 PM"
      ]
    }
  ];

  const doctor = doctors.find(
    (doctor) => doctor.id === Number(id)
  );

  if (!doctor) {
    return (
      <div className="doctor-not-found">

        <h1>Doctor Not Found</h1>

        <p>
          The doctor you are looking for does not exist.
        </p>

        <Link to="/doctors">
          <button>Back to Doctors</button>
        </Link>

      </div>
    );
  }

  return (
    <div className="doctor-details-page">

      {/* Doctor Header */}

      <section className="doctor-profile">

        <div className="doctor-profile-icon">
          👨‍⚕️
        </div>

        <div>

          <h1>{doctor.name}</h1>

          <h3>{doctor.specialization}</h3>

          <p>
            ⭐ {doctor.experience} years experience
          </p>

        </div>

      </section>


      {/* Doctor Information */}

      <section className="doctor-information">

        <div className="doctor-about">

          <h2>About Doctor</h2>

          <p>{doctor.about}</p>

          <h3>Qualification</h3>

          <p>{doctor.qualification}</p>

          <h3>Consultation Fee</h3>

          <p>₹{doctor.fee}</p>

        </div>


        {/* Appointment Slots */}

        <div className="appointment-slots">

          <h2>Available Time Slots</h2>

          <p>Select a convenient time:</p>

          <div className="time-slots">

            {doctor.availability.map((time) => (

              <button
                key={time}
                className={
                  selectedTime === time
                    ? "selected-time"
                    : ""
                }
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>

            ))}

          </div>

          {selectedTime && (
            <p className="selected-message">
              Selected: {selectedTime}
            </p>
          )}

          <Link to="/appointment">
            <button
              className="book-doctor-button"
              disabled={!selectedTime}
            >
              Book Appointment
            </button>
          </Link>

        </div>

      </section>


      {/* Back */}

      <div className="back-doctors">

        <Link to="/doctors">
          ← Back to Doctors
        </Link>

      </div>

    </div>
  );
}

export default DoctorDetails;