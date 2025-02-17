//Page shown if error occurs (HomePage)

import {useRouteError} from "react-router-dom"
import {Helmet} from 'react-helmet-async';
function ErrorPage() {

    const error = useRouteError()
    console.log(error)
  return (
    <div>
      <Helmet> {/* SEO: Setting the page title and meta tags */}
              <title>Error Page</title>
              <meta name="description" content="Error page to handle error in viewing page" />
              <meta property="og:title" content="Error Page | Rachana sravanthi" />
              <meta property="og:description" content="Error page to handle error in viewing page" />
      </Helmet>

      something went wrong
      <h2>some error occurred</h2>
    </div>
  )
}

export default ErrorPage
