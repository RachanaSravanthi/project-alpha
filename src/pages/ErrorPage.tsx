import {useRouteError} from "react-router-dom"
function ErrorPage() {
    const error = useRouteError()
    console.log(error)
  return (
    <div>
      something went wrong
      <h2>some error occurred</h2>
    </div>
  )
}

export default ErrorPage
