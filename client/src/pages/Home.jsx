import { useState } from "react";
import { Link } from "react-router-dom";

function Home() {

  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("All");

  const doctors = [
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
    },
    {
      id: 4,
      name: "Dr. Sneha Joshi",
      specialization: "Pediatrician",
      experience: 8
    }
  ];

  // Filter doctors
  const filteredDoctors = doctors.filter((doctor) => {

    const matchesSearch =
      doctor.name.toLowerCase().includes(search.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(search.toLowerCase());

    const matchesSpecialization =
      specialization === "All" ||
      doctor.specialization === specialization;

    return matchesSearch && matchesSpecialization;
  });

  return (
    <div className="home-page">

      {/* Hero Section */}

      <section className="hero">

        <div className="hero-content">

          <p className="hero-small">
            🩺 Trusted Healthcare Platform
          </p>

          <h1>
            Your Health,
            <br />
            Our Priority
          </h1>

          <p>
            Find trusted doctors and book healthcare
            appointments quickly and easily.
          </p>

          <div className="hero-buttons">

            <Link to="/doctors">
              <button>
                Find a Doctor
              </button>
            </Link>

            <Link to="/appointment">
              <button>
                Book Appointment
              </button>
            </Link>

          </div>

        </div>

      </section>


      {/* Search Section */}

      <section className="doctor-search">

        <h2>Find the Right Doctor</h2>

        <p>
          Search by doctor name or specialization
        </p>

        <div className="search-box">

          <input
            type="text"
            placeholder="🔍 Search doctor or specialization..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={specialization}
            onChange={(e) =>
              setSpecialization(e.target.value)
            }
          >

            <option value="All">
              All Specializations
            </option>

            <option value="Cardiologist">
              Cardiologist
            </option>

            <option value="Dermatologist">
              Dermatologist
            </option>

            <option value="Neurologist">
              Neurologist
            </option>

            <option value="Pediatrician">
              Pediatrician
            </option>

          </select>

        </div>

      </section>


      {/* Doctor Cards */}

      <section className="featured-doctors">

        <h2>Available Doctors</h2>

        <div className="doctor-grid">

          {filteredDoctors.length > 0 ? (

            filteredDoctors.map((doctor) => (

              <div
                className="doctor-card"
                key={doctor.id}
              >

                <div className="doctor-icon">
                  👨‍⚕️
                </div>

                <h3>{doctor.name}</h3>

                <p className="specialization">
                  {doctor.specialization}
                </p>

                <p>
                  {doctor.experience} years experience
                </p>

                <div className="doctor-actions">

                  <Link to={`/doctor/${doctor.id}`}>
                    <button>
                      View Details
                    </button>
                  </Link>

                  <Link to="/appointment">
                    <button>
                      Book
                    </button>
                  </Link>

                </div>

              </div>

            ))

          ) : (

            <p>
              No doctors found. Try another search.
            </p>

          )}

        </div>

      </section>


      {/* Services */}

      <section className="services">

        <h2>Why Choose MediCare?</h2>

        <div className="service-grid">

          <div className="service-card">
            <span>🔍</span>
            <h3>Find Doctors</h3>
            <p>
              Search doctors by name and specialization.
            </p>
          </div>

          <div className="service-card">
            <span>📅</span>
            <h3>Easy Booking</h3>
            <p>
              Book appointments in just a few clicks.
            </p>
          </div>

          <div className="service-card">
            <span>🔒</span>
            <h3>Secure Platform</h3>
            <p>
              Your healthcare information is handled
              securely.
            </p>
          </div>

          <div className="service-card">
            <span>❤️</span>
            <h3>Quality Healthcare</h3>
            <p>
              Connect with healthcare professionals
              conveniently.
            </p>
          </div>

        </div>

      </section>


      {/* Footer */}

      <footer className="footer">

        <h3>🩺 MediCare</h3>

        <p>
          Healthcare Appointment Management System
        </p>

        <p>
          © 2026 MediCare
        </p>

      </footer>

    </div>
  );
}

export default Home;