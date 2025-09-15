import PropTypes from "prop-types";
export const WarningAlert = ({ text }) => {
  return <div className="alert warning-alert">{text}</div>;
};
WarningAlert.propTypes = {
  text: PropTypes.string.isRequired,
};
