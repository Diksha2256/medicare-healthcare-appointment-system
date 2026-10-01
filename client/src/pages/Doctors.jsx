import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Doctors() {

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {

    const doctorData = [
      {
        id: 1,
        name: "Dr. Rahul Sharma",
        specialization: "Cardiologist",
        experience: 10
      },
      {
        id: 2,
        name: "Dr. Priya Patil",
        specialization: "Dermatologist",
        experience: 7
      },
      {
        id: 3,
        name: "Dr. Amit Kulkarni",
        specialization: "Neurologist",
        experience: 12
      }
    ];

    setDoctors(doctorData);

  }, []);

  return (
    <div>

      <h1>Our Doctors</h1>

      <p>Choose a doctor and view their details.</p>

      {doctors.map((doctor) => (

        <div key={doctor.id}>

          <h2>{doctor.name}</h2>

          <p>
            Specialization: {doctor.specialization}
          </p>

          <p>
            Experience: {doctor.experience} years
          </p>

          <Link to={`/doctor/${doctor.id}`}>
            <button>View Details</button>
          </Link>

          <hr />

        </div>

      ))}

    </div>
  );
}

export default Doctors;