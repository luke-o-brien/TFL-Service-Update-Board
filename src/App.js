import React from "react"
import Lines from "./components/Lines"
import Elizabeth from "./components/Elizabeth"

function App() {
  return <div>
    <div className="header">
      <h1>Service Update</h1>
      <span>Transport For London</span>
    </div>
    <div className="update-container">
      < Lines />  
    </div>

  </div>
}

export default App
