// // import React, { useState } from "react";
// import React, { useState } from 'react';
// const AddAppointment = ({ onAddAppointment, onToggleForm, toggleForm }) => {
//   const [formData, setFormData] = useState({
//     cancer_service: false,
//     apt_date: "",
//     apt_time: "",
//     appointment_notes: "",
//     patient_id: "",
//     doctor_id: "",
//   });

//   const { cancer_service, apt_date, apt_time, appointment_notes, patient_id, doctor_id } = formData;

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     onAddAppointment(formData);
//     setFormData({
//       cancer_service: false,
//       apt_date: "",
//       apt_time: "",
//       appointment_notes: "",
//       patient_id: "",
//       doctor_id: "",
//     });
//     onToggleForm();
//   };

//   return (
//     <div>
//       {toggleForm && (
//         <div className="my-4">
//           <button
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             type="button"
//             onClick={() => onToggleForm()}
//           >
//             Cancel
//           </button>
//           <form onSubmit={handleSubmit} className="mt-4">
//             <div>
//               <label className="block text-gray-700">Cancer Service:</label>
//               <input
//                 type="checkbox"
//                 name="cancer_service"
//                 checked={cancer_service}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="mt-4">
//               <label className="block text-gray-700">Date:</label>
//               <input
//                 type="date"
//                 name="apt_date"
//                 value={apt_date}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="mt-4">
//               <label className="block text-gray-700">Time:</label>
//               <input
//                 type="time"
//                 name="apt_time"
//                 value={apt_time}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="mt-4">
//               <label className="block text-gray-700">Notes:</label>
//               <textarea
//                 name="appointment_notes"
//                 value={appointment_notes}
//                 onChange={handleChange}
//                 rows="3"
//                 className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
//                 required
//               ></textarea>
//             </div>
//             <div className="mt-4">
//               <label className="block text-gray-700">Patient ID:</label>
//               <input
//                 type="number"
//                 name="patient_id"
//                 value={patient_id}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="mt-4">
//               <label className="block text-gray-700">Doctor ID:</label>
//               <input
//                 type="number"
//                 name="doctor_id"
//                 value={doctor_id}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <button
//               className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//               type="submit"
//             >
//               Save Appointment
//             </button>
//           </form>
//         </div>
//       )}
//       {!toggleForm && (
//         <button
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           type="button"
//           onClick={() => onToggleForm()}
//         >
//           Add Appointment
//         </button>
//       )}
//     </div>
//   );
// };

// export default AddAppointment;
// App.js

import React, { useState, useEffect } from 'react';
import AddAppointment from './AddAppointment';

const App = () => {
  const [appointments, setAppointments] = useState([]);
  const [showForm, setShowForm] = useState(false); // State to manage form visibility

  const fetchAppointments = () => {
    fetch('http://localhost:9292/appointments')
      .then((response) => response.json())
      .then((data) => setAppointments(data))
      .catch((error) => console.error('Error fetching appointments:', error));
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const addAppointment = (newAppointment) => {
    fetch('http://localhost:9292/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAppointment),
    })
      .then((response) => response.json())
      .then((data) => {
        setAppointments([...appointments, data]);
      })
      .catch((error) => console.error('Error adding appointment:', error));
  };

  // Function to toggle the form for adding new appointments
  const toggleForm = () => {
    setShowForm(!showForm); // Toggle the value of showForm
  };

  return (
    <div>
      <h1>Appointments</h1>
      {/* Pass showForm state as toggleForm prop */}
      <AddAppointment onAddAppointment={addAppointment} onToggleForm={toggleForm} toggleForm={showForm} />
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            {/* Display appointment information */}
            {/* You can use the AppointmentInfo component here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;


