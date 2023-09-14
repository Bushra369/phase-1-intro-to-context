// Your code here 
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(employeeData) {
  return employeeData.map(createEmployeeRecord);
}

function createTimeInEvent(employee, dateStamp) {
  const [date, time] = dateStamp.split(" ");
  const hour = parseInt(time, 10);

  employee.timeInEvents.push({
    type: "TimeIn",
    date,
    hour,
  });

  return employee;
}

function createTimeOutEvent(employee, dateStamp) {
  const [date, time] = dateStamp.split(" ");
  const hour = parseInt(time, 10);

  employee.timeOutEvents.push({
    type: "TimeOut",
    date,
    hour,
  });

  return employee;
}

function hoursWorkedOnDate(employee, date) {
  const timeIn = employee.timeInEvents.find((event) => event.date === date);
  const timeOut = employee.timeOutEvents.find((event) => event.date === date);

  if (timeIn && timeOut) {
    const hoursWorked = (timeOut.hour - timeIn.hour) / 100;
    return hoursWorked;
  }

  return 0;
}

function wagesEarnedOnDate(employee, date) {
  const hoursWorked = hoursWorkedOnDate(employee, date);
  const payEarned = hoursWorked * employee.payPerHour;
  return payEarned;
}

function allWagesFor(employee) {
  const datesWorked = employee.timeInEvents.map((event) => event.date);
  const totalWages = datesWorked.reduce((total, date) => {
    return total + wagesEarnedOnDate(employee, date);
  }, 0);

  return totalWages;
}

function calculatePayroll(employees) {
  return employees.reduce((totalPayroll, employee) => {
    return totalPayroll + allWagesFor(employee);
  }, 0);
}

