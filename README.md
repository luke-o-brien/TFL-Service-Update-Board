# React TFL Service update App

### Project summary 
For this project I Built a one page React app which utilises the Transport For London API to display service update information for all transport lines in London. This project was designed to be used on mobile but can also be used on desktop. 

### Objectives 
- create a web app which uses the TFL API to display status updates of TFL services 
- Designed with mobile users first but with ability to use on desktops
- Ensure that the status of the lines update automatically every 5 mins 
- add seperate componant for the Elizabeth Line showing comming soon 


### Technologies used 
- CSS
- Javascript 
- React
- TFL API

### Fetch data and update every 5 minutes

To get the data from the api I used the line endpoint and added the modes which I wanted to display and ended with the status call. The data was then saved into state in order to mapped later on to display the line data. The API fetch was wrapped in a use effect statement to prevent repeated and unnessary calls to the API. To ensure get the data to refresh every five minutes I used a setInterval function which recalls the fetchLines function every 5 minutes.

```js
const [tubeLines, setTubeLines] = React.useState(undefined)

React.useEffect(() => {
    async function fetchLines() {
      const resp = await fetch('https://api.tfl.gov.uk/line/mode/tube,overground,dlr,tflrail,tram/status/')
      const tubeLines = await resp.json()
      setTubeLines(tubeLines)
    }
    fetchLines()
    setInterval(() => {
      fetchLines()
    }, 300000);
  }, []);
```
### Show service Disruption details

I wanted users to have the option of displaying the reason for service disruption however did not want to include clickable item which did not return data therefore I used conditional rendering to display the clickable anchor tags. The condition i used was based upon status severity codes which was a value returned by the api. if the status severity equalled 10 (good service) or 20 (service closed at night) i would return nothing however for all other severity codes the a tags would be displayed.

To get the detailed information to appear to the user i used an handleclick function to switch the value of is shown from false to true and then conditional rendering to check the value and render to text only if the value was true.

```js
return <div key={line.lineId}>
   {status.statusSeverity === 10 || status.statusSeverity === 20 ? 
   <h3>{status.statusSeverityDescription}</h3> : <h3>{status.statusSeverityDescription}<i className="fa-solid fa-circle-exclamation fa-2xs"></i></h3>}
   {status.statusSeverity === 20 || status.statusSeverity === 10 ?  
    <></> : <a onClick={handleClick}>More details<i className={arrow === false ? "fa-solid fa-angle-down" : "fa-solid fa-angle-up"}></i></a>}
    {(isShown && status.statusSeverity !== 20) && <p>{status.reason}</p>}

```



### UI Design 

for this project I opted for a simple clean design with Line appropriate accent colours. I used conditionally rendered anchor tags with simple underline for users to click on to display more information. The red warning circle was used to make it more obvious to the user where the problems are. I used a consitant clear font on all componants with varing font weights to indicate different purposes of the text.   

### Potential Future developments 
- remove coming soon componant and update stylesheet once Elizabeth line has opened 
- create multipage app with other status update for riverboats and busses
- use TFL api to add functionality for Live departures

