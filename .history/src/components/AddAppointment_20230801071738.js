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
import AppointmentList from './components/AppointmentList';
import AddAppointment from './components/AddAppointment';

const App = () => {
  const [appointments, setAppointments] = useState([]);
  const [toggleForm, setToggleForm] = useState(false);

  useEffect(() => {
    // Fetch the list of appointments from the Sinatra backend
    fetch('http://localhost:9292/appointments')
      .then((response) => response.json())
      .then((data) => {
        setAppointments(data);
      })
      .catch((error) => {
        console.error('Error fetching appointments:', error);
      });
  }, []);

  const handleAddAppointment = (newAppointment) => {
    // Make a POST request to the Sinatra backend to create a new appointment
    fetch('http://localhost:9292/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAppointment),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the new appointment
        setAppointments([...appointments, data]);
      })
      .catch((error) => {
        console.error('Error creating appointment:', error);
      });
  };

  const handleDeleteAppointment = (id) => {
    // Make a DELETE request to the Sinatra backend to delete an appointment
    fetch(`http://localhost:9292/appointments/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Update the state by removing the deleted appointment from the list
        setAppointments(appointments.filter((appointment) => appointment.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting appointment:', error);
      });
  };

  return (
    <div className="container mx-auto mt-4 p-4">
      <h1 className="text-3xl font-bold mb-4">Appointment Scheduler</h1>
      <AddAppointment
        onAddAppointment={handleAddAppointment}
        onToggleForm={() => setToggleForm(!toggleForm)}
        toggleForm={toggleForm}
      />
      <AppointmentList appointments={appointments} onDeleteAppointment={handleDeleteAppointment} />
    </div>
  );
};

export default App;

// AddAppointment.js
import React, { useState } from 'react';

const AddAppointment = ({ onAddAppointment, onToggleForm, toggleForm }) => {
  const [formData, setFormData] = useState({
    cancer_service: false,
    apt_date: '',
    apt_time: '',
    appointment_notes: '',
    patient_id: '',
    doctor_id: '',
  });

  const { cancer_service, apt_date, apt_time, appointment_notes, patient_id, doctor_id } = formData;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Call the callback function to add the new appointment
    onAddAppointment(formData);

    // Clear the form data after successful submission
    setFormData({
      cancer_service: false,
      apt_date: '',
      apt_time: '',
      appointment_notes: '',
      patient_id: '',
      doctor_id: '',
    });

    // Toggle the form visibility to hide it after successful submission
    onToggleForm();
  };

  return (
    <div>
      {toggleForm && (
        // The form is displayed only when the 'toggleForm' state is true
        <div className="my-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => onToggleForm()}
          >
            Cancel
          </button>
          <form onSubmit={handleSubmit} className="mt-4">
            {/* ... Form fields ... */}
          </form>
        </div>
      )}
      {!toggleForm && (
        // The 'Add Appointment' button is displayed only when the 'toggleForm' state is false
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={() => onToggleForm()}
        >
          Add Appointment
        </button>
      )}
    </div>
  );
};

export default AddAppointment;
