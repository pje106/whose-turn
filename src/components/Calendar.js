// import React, { useState } from "react";
// import TextField from "@mui/material/TextField";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
// import Badge from "@mui/material/Badge";
// import { PickersDay } from "@mui/x-date-pickers/PickersDay";
// import CheckIcon from "@mui/icons-material/Check";

// const Calendar = () => {
//   const [value, setValue] = useState(new Date());
//   const [highlightedDays, setHighlightedDays] = useState([]);
//   // [1, 2, 13]
//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <StaticDatePicker
//         // mask='____/__/__'
//         variant="static"
//         orientation="portrait"
//         value={value}
//         disableFuture
//         onChange={(newValue) => setValue(newValue)}
//         renderInput={(params) => {
//           <TextField {...params} />;
//         }}
//         renderDay={(day, _value, DayComponentProps) => {
//           const isSelected =
//             !DayComponentProps.outsideCurrentMSnth &&
//             highlightedDays.indexOf(day.getDate()) >= 0;

//           return (
//             <Badge
//               key={day.toString()}
//               overlap="circular"
//               badgeContent={isSelected ? <CheckIcon color="red" /> : undefined}
//             >
//               <PickersDay {...DayComponentProps} />
//             </Badge>
//           );
//         }}
//       />
//     </LocalizationProvider>
//   );
// };

// export default Calendar;

// import * as React from "react";
// import dayjs from "dayjs";
// import TextField from "@mui/material/TextField";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";

// const isWeekend = (date) => {
//   const day = date.day();
//   return day === 0 || day === 6;
// };

// export default function StaticDatePickerLandscape() {
//   const [value, setValue] = React.useState(dayjs(""));

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <StaticDatePicker
//         orientation="landscape"
//         openTo="day"
//         value={value}
//         shouldDisableDate={isWeekend}
//         onChange={(newValue) => {
//           setValue(newValue);
//         }}
//         renderInput={(params) => <TextField {...params} />}
//       />
//     </LocalizationProvider>
//   );
// }

import React, { useState } from "react";
import Calendar from "rc-calendar";
import "rc-calendar/assets/index.css";

function App() {
  const [date, setDate] = useState(new Date());

  return (
    <div style={{ display: "flex", alignItems: "center", height: "10px" }}>
      <div style={{ margin: "auto" }}>
        <Calendar value={date} onChange={(value) => setDate(value)} />
      </div>
    </div>
  );
}

export default App;
