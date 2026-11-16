const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="alert alert-danger mt-4" role="alert">
      <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3">
        <span>{message}</span>
        {onRetry && (
          <button type="button" className="btn btn-outline-danger btn-sm" onClick={onRetry}>
            Повторить
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
