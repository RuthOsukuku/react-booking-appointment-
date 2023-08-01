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

import React, { useState } from "react";

const AddAppointment = ({ onAddAppointment, onToggleForm, toggleForm }) => {
  const [formData, setFormData] = useState({
    cancer_service: false,
    apt_date: "",
    apt_time: "",
    appointment_notes: "",
    patient_id: "",
    doctor_id: "",
  });

  const { cancer_service, apt_date, apt_time, appointment_notes, patient_id, doctor_id } = formData;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddAppointment(formData);
    setFormData({
      cancer_service: false,
      apt_date: "",
      apt_time: "",
      appointment_notes: "",
      patient_id: "",
      doctor_id: "",
    });
    onToggleForm();
  };

  return (
    <div>
      {toggleForm && (
        <div className="my-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={onToggleForm}
          >
            Cancel
          </button>
          <form onSubmit={handleSubmit} className="mt-4">
            <div>
              <label className="block text-gray-700">Cancer Service:</label>
              <input
                type="checkbox"
                name="cancer_service"
                checked={cancer_service}
                onChange={handleChange}
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Date:</label>
              <input
                type="date"
                name="apt_date"
                value={apt_date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Time:</label>
              <input
                type="time"
                name="apt_time"
                value={apt_time}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Notes:</label>
              <textarea
                name="appointment_notes"
                value={appointment_notes}
                onChange={handleChange}
                rows="3"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                required
              ></textarea>
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Patient ID:</label>
              <input
                type="number"
                name="patient_id"
                value={patient_id}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Doctor ID:</label>
              <input
                type="number"
                name="doctor_id"
                value={doctor_id}
                onChange={handleChange}
                required
              />
            </div>
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Save Appointment
            </button>
          </form>
        </div>
      )}
      {!toggleForm && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={onToggleForm}
        >
          Add Appointment
        </button>
      )}
    </div>
  );
};

export default AddAppointment;

