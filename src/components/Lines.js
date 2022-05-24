import react from "react";
import React from "react"

function Lines() {
  const [tubeLines, setTubeLines] = React.useState(undefined)
  const [isShown, setIsShown] = React.useState(false)
  const [arrow, setArrow] = react.useState(false)
  console.log(isShown)

  function handleClick() {
    setIsShown(!isShown)
    setArrow(!arrow)
  }
  React.useEffect(() => {
    async function fetchLines() {
      const resp = await fetch('https://api.tfl.gov.uk/line/mode/tube,overground,dlr,tflrail,tram,elizabeth-line/status/')
      const tubeLines = await resp.json()
      setTubeLines(tubeLines)
    }
    fetchLines()
    setInterval(() => {
      fetchLines()
    }, 300000);
  }, []);
  
  return <div className="Line-update-boxes">
    {tubeLines ?
      tubeLines.map((line) => {
        return <div key={line.id} id={`${line.id}`} className={`line-container ${line.id}`}>
          <h2>{line.name}</h2>
          {line.lineStatuses.map((status) => {
            return <div key={line.lineId}>
              {/* if Line is running with good service [status 10] or is shut for night [status 20] display no more info*/}
              {/* if Line is running with problems [any other status code] display caution icon and clickablemore details a element */}
              {status.statusSeverity === 10 || status.statusSeverity === 20 ? 
                <h3>{status.statusSeverityDescription}</h3> : <h3>{status.statusSeverityDescription}<i className="fa-solid fa-circle-exclamation fa-2xs"></i></h3>}
              {status.statusSeverity === 20 || status.statusSeverity === 10 ?  
                <></> : <a onClick={handleClick}>More details<i className={arrow === false ? "fa-solid fa-angle-down" : "fa-solid fa-angle-up"}></i></a>}
              {/* show reason for problem unless the line is closed [status 20] as the information is given in the h3 element */}
              {(isShown && status.statusSeverity !== 20) && <p>{status.reason}</p>}
            </div>
          })}
        </div>
      
      }) : <p>Loading data please wait...</p>
    }
  </div>

}

export default Lines