function formatHourMinute({ hour, minute }) {
  return `${hour}:${minute}`;
}

formatHourMinute`test`;

const App = () => {
  const [now, setNowTime] = React.useState(getNow());
  const [startTime, setStartTime] = React.useState({
    hour: '09',
    minute: '00'
  });
  const [endTime, setEndTime] = React.useState({ hour: '15', minute: '00'});

  const startTimeInputRef = React.createRef();
  const endTimeInputRef = React.createRef();

  React.useEffect(() => {
    console.log("useEffect");
    const interval = setInterval(() => {
      setNowTime(getNow());
    }, 1000);

    startTimeInputRef.current.value = formatHourMinute(startTime)
    endTimeInputRef.current.value = formatHourMinute(endTime)

    return () => {
      clearInterval(interval);
    };
  }, []);

  const isEatingWindow = getIsEatingWindow(now, startTime, endTime);

  console.log("render");

  return (
    <div class={"app " + (isEatingWindow ? "eating-window" : "fasting")}>
      <div class="hero">
        <span class="date">{getDateTime(now)}</span>
        <h1>{isEatingWindow ? "You Can Eat 😋" : "You Are Fasting Now 😎"}</h1>
        <div class="block">
          {!isEatingWindow && (
            <>
              <h2>Time until your fast end</h2>
              <h2>{getDifferenceToStartEatingWindow(now, startTime)}</h2>
            </>
          )}

          {isEatingWindow && (
            <>
              <h2>Time until your eating window end </h2>
              <h2>{getDifferenceToEndEatingWindow(now, endTime)}</h2>
            </>
          )}
        </div>
        <h3>Your eating window</h3>
        <h3>
          {startTime.hour}:{startTime.minute} <i data-feather="arrow-right"></i>{" "}
          {endTime.hour}:{endTime.minute}
        </h3>
      </div>
      <div>
        <h3>Change eating window</h3>
        <h3>Start Time</h3>
        <div>
          <input
            type="time"
            ref={startTimeInputRef}
            onChange={event => {
              const hour = event.target.value.split(':')[0];
              const minute = event.target.value.split(':')[1];
              setStartTime({ hour, minute });
            }}
          />
        </div>
        <h3>End Time</h3>
        <div>
          <input
            type="time"
            ref={endTimeInputRef}
            onChange={event => {
              const hour = event.target.value.split(':')[0];
              const minute = event.target.value.split(':')[1];
              setEndTime({ hour, minute });
            }}
          />
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

feather.replace();
