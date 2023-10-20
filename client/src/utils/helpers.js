import moment from "moment";

// Array of input rules for Ant Design Form items
export const getAntdFormInputRules = [
  {
    required: true,
    message: "Required",
  },
];

// Function to format a date using Moment.js
export const getDateFormat = (date) => {
  return moment(date).format("MMMM Do YYYY, h:mm A");
};
