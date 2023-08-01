// import { BiCalendar } from "react-icons/bi";
// import { useEffect, useState, useCallback } from "react";
// import AddAppointment from "./components/AddAppointment";
// import AppointmentInfo from "./components/AppointmentInfo";
// import Search from "./components/Search";

// function App() {
//   let [appointmentList, setAppointmentList] = useState([]);
//   let [query, setQuery] = useState("");
//   let [sortBy, setSortBy] = useState("cancerService");
//   let [orderBy, setOrderBy] = useState("asc");

 
//         const filteredAppointment = appointmentList
//         .filter((item) => {
//           return (
//             (item.cancerService?.toLowerCase() || '').includes(query.toLowerCase()) ||
//             (item.fullName?.toLowerCase() || '').includes(query.toLowerCase()) ||
//             (item.aptNotes?.toLowerCase() || '').includes(query.toLowerCase())
//           );
//         })
//         .sort((a, b) => {
//           let order = orderBy === "asc" ? 1 : -1;
//           return ((a[sortBy]?.toLowerCase() || '') < (b[sortBy]?.toLowerCase() || ''))
//             ? -1 * order
//             : 1 * order;
//         });
      
//   const fetchData = useCallback(() => {
//     fetch("./data.json")
//       .then((response) => response.json())
//       .then((data) => {
//         setAppointmentList(data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   return (
//     <>
//       <div className="App container mx-auto mt-3 font-thin">
//         <h1 className="text-5xl mb-4">
//           <BiCalendar className="inline-block text-red-400 align-top" />
//           Your Appointments
//         </h1>
//         <AddAppointment
//           onSendAppointment={(appointment) => {
//             setAppointmentList([...appointmentList, appointment]);
//           }}
//           lastId={appointmentList.reduce(
//             (pre, curr) => (Number(curr.id) > pre ? Number(curr.id) : pre),
//             0
//           )}
//         />
//         <Search
//           query={query}
//           onQueryChange={(event) => {
//             setQuery(event.target.value);
//           }}
//           orderBy={orderBy}
//           onOrderByChange={(val) => {
//             setOrderBy(val);
//           }}
//           sortBy={sortBy}
//           onSortBYChange={(val) => {
//             setSortBy(val);
//           }}
//         />
//         <ul className="divide-y divide-gray-200">
//           {filteredAppointment.map((appointment) => {
//             return (
//               <AppointmentInfo
//                 onDeleteAppointment={(appointmentId) => {
//                   setAppointmentList(
//                     appointmentList.filter(
//                       (appointment) => appointmentId !== appointment.id
//                     )
//                   );
//                 }}
//                 appointment={appointment}
//                 key={appointment.id}
//               />
//             );
//           })}
//         </ul>
//       </div>
//     </>
//   );
// }

// export default App;
import React, { useState, useEffect, useCallback } from "react";
import { BiCalendar } from "react-icons/bi";
import AddAppointment from "./components/AddAppointment";
import AppointmentInfo from "./components/AppointmentInfo";
import Search from "./components/Search";

function App() {
  const [appointmentList, setAppointmentList] = useState([]);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("cancerService");
  const [orderBy, setOrderBy] = useState("asc");
  const [toggleForm, setToggleForm] = useState(false);

  const handleAddAppointment = (appointment) => {
    setAppointmentList([...appointmentList, appointment]);
  };

  const handleToggleForm = () => {
    setToggleForm(!toggleForm);
  };

  const fetchData = useCallback(() => {
    fetch("./data.json")
      .then((response) => response.json())
      .then((data) => {
        setAppointmentList(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Filter and sort the appointments based on the search query, sortBy, and orderBy
  const filteredAppointment = appointmentList
    .filter((item) => {
      return (
        (item.cancerService?.toLowerCase() || "").includes(query.toLowerCase()) ||
        (item.fullName?.toLowerCase() || "").includes(query.toLowerCase()) ||
        (item.aptNotes?.toLowerCase() || "").includes(query.toLowerCase())
      );
    })
    .sort((a, b) => {
      let order = orderBy === "asc" ? 1 : -1;
      return (a[sortBy]?.toLowerCase() || "") < (b[sortBy]?.toLowerCase() || "") ? -1 * order : 1 * order;
    });

  return (
    <>
      <div className="App container mx-auto mt-3 font-thin">
        <h1 className="text-5xl mb-4">
          <BiCalendar className="inline-block text-red-400 align-top" />
          Your Appointments
        </h1>
        <AddAppointment
          onAddAppointment={handleAddAppointment}
          onToggleForm={handleToggleForm}
          toggleForm={toggleForm}
        />
        <Search
          query={query}
          onQueryChange={(event) => {
            setQuery(event.target.value);
          }}
          orderBy={orderBy}
          onOrderByChange={(val) => {
            setOrderBy(val);
          }}
          sortBy={sortBy}
          onSortBYChange={(val) => {
            setSortBy(val);
          }}
        />
        <ul className="divide-y divide-gray-200">
          {filteredAppointment.map((appointment) => {
            return (
              <AppointmentInfo
                onDeleteAppointment={(appointmentId) => {
                  setAppointmentList(
                    appointmentList.filter((appointment) => appointmentId !== appointment.id)
                  );
                }}
                appointment={appointment}
                key={appointment.id}
              />
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;



