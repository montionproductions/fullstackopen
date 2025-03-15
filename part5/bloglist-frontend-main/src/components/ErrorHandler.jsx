const ErrorHandler = ({msg, typeError}) => {
    if (!msg) return null; // Si no hay mensaje, no renderizar nada

    const style = {
      color: typeError === 'success' ? 'green' : 'red',
      background: 'lightgrey',
      fontSize: 20,
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    };
  
    return <div style={style}>{msg}</div>;
}

export default ErrorHandler