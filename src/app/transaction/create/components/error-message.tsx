const ErrorMessage: React.FC<{
  error: any;
  message: string;
}> = ({ error, message }) => {
  return error ? (
    <p className="text-sm font-medium text-destructive">
      {error.message || message}
    </p>
  ) : null;
};

export default ErrorMessage;
