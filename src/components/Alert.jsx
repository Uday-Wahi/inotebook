const Alert = ({ alert }) => {
  return (
    <div style={{ height:"50px" }}>
      {alert && (
        <div
          className={`alert-dismissible fade show alert alert-${alert.type}`}
          role="alert">
          {alert.msg}
        </div>
      )}
    </div>
  );
};

export default Alert;
