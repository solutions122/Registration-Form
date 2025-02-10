import React from 'react'
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div>
      <h2>Welcome to the Home Page</h2>
      {/* Button that navigates to the PDF page */}
      <Link to="/Pdf">
        <button>Go to PDF Page</button>
      </Link>
      <br />

      <Link to="/Extra">
        <button>Go to Extra Page</button>
      </Link>

      <Link to="/Main">
        <button>Go to Main Page</button>
      </Link>

      <Link to="/Header">
        <button>Go to Head Page</button>
      </Link>
    </div>
  )
}

export default Home
