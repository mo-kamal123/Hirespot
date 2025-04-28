
const Error = ( {message, style} ) => {
  return (
    <div>
        <h1 className={style}>Error</h1>
        <p>{message}</p>
    </div>
  )
}

export default Error