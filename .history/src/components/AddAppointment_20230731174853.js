import { useState } from "react";
import { BiCalendarPlus } from "react-icons/bi";

const AddAppointment = ({ onSendAppointment, lastId }) => {
  const clearData = {
    cancerService: "",
    fullName: "",
    aptNotes: "",
    aptDate: "",
    aptTime: "",
  };

  let [toggleForm, setToggleForm] = useState(false);
  let [formData, setFormData] = useState(clearData);

  const formDataPosted = () => {
    if (formData.cancerService && formData.fullName && formData.aptDate) {
      const appointmentInfo = {
        id: lastId + 1,
        cancerService: formData.cancerService,
        fullName: formData.fullName,
        aptNotes: formData.aptNotes,
        aptDate: formData.aptDate + " " + formData.aptTime,
      };
      
      fetch("http://localhost:9292/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentInfo),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
      
      setFormData(clearData);
      setToggleForm(!toggleForm);
    } else {
      alert("fill required fields");
    }
  };

  // The rest of the component remains the same.
};

  return (
    <div>
      <button
        onClick={() => setToggleForm(!toggleForm)}
        className={`bg-blue-400 text-white px-2 py-3 w-full text-left  ${
          toggleForm ? "rounded-t-md" : "rounded-md"
        }`}
      >
        <div>
          <BiCalendarPlus className="inline-block align-text-top" /> Add
          Appointment
        </div>
      </button>
      {toggleForm && (
        <div className="border-r-2 border-b-2 border-l-2 border-light-blue-500 rounded-b-md pl-4 pr-4 pb-4">
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Full Name
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                onChange={(event) => {
                  setFormData({ ...formData, fullName: event.target.value });
                }}
                type="text"
                name="fullName"
                id="fullName"
                value={formData.fullName}
                required
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label
              htmlFor="cancerService"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Cancer Service
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                onChange={(event) => {
                  setFormData({ ...formData, cancerService: event.target.value });
                }}
                required
                type="text"
                name="cancerService"
                id="cancerService"
                value={formData.cancerService}
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label
              htmlFor="aptDate"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Apt Date
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                required
                onChange={(event) => {
                  setFormData({ ...formData, aptDate: event.target.value });
                }}
                type="date"
                name="aptDate"
                id="aptDate"
                value={formData.aptDate}
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label
              htmlFor="aptTime"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Apt Time
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                onChange={(event) => {
                  setFormData({ ...formData, aptTime: event.target.value });
                }}
                type="time"
                name="aptTime"
                id="aptTime"
                value={formData.aptTime}
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label
              htmlFor="aptNotes"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Appointment Notes
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <textarea
                onChange={(event) => {
                  setFormData({ ...formData, aptNotes: event.target.value });
                }}
                id="aptNotes"
                name="aptNotes"
                value={formData.aptNotes}
                rows={3}
                className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              ></textarea>
            </div>
          </div>
          <button
            onClick={formDataPosted}
            className="bg-blue-500 text-white px-2 py-3 w-full text-left rounded-md"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );


export default AddAppointment;
