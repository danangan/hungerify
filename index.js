const IS_DEBUG = true;

const DATE_TIME_FORMAT = "dddd, MMM Do hh:mm:ss";

const durationFormatter = duration => {
  if (IS_DEBUG) {
    return `${duration.get("hours")} hours, ${duration.get(
      "minutes"
    )} minutes and ${duration.get("seconds")} seconds`;
  }

  return `${duration.get("hours")} hours and ${duration.get("minutes")}`;
};

const getNow = () => {
  return moment().hours(12);
};

const getDateTime = () => {
  return getNow().format(DATE_TIME_FORMAT);
};

const getEndEatingWindowToday = () => {
  return getNow()
    .hours(15)
    .minutes(0)
    .seconds(0);
};

const getStartEatingWindowToday = () => {
  return getNow()
    .hours(9)
    .minutes(0)
    .seconds(0);
};

const getDifferenceToEndEatingWindow = () => {
  const endTime = getEndEatingWindowToday();
  const now = getNow();
  const duration = moment.duration(endTime.diff(now));
  return durationFormatter(duration);
};

const getDifferenceToStartEatingWindow = () => {
  const startTime = getStartEatingWindowToday();
  const now = getNow();
  const duration = moment.duration(now.diff(startTime));
  return durationFormatter(duration);
};

const getIsEatingWindow = () => {
  const startEatingWindowToday = getStartEatingWindowToday();
  const endEatingWindowToday = getEndEatingWindowToday();
  const now = getNow();

  return (
    now.isBefore(endEatingWindowToday) && now.isAfter(startEatingWindowToday)
  );
};

const App = () => {
  const [now, setNowTime] = React.useState(getDateTime());
  const [isEatingWindow, setIsEatingWindow] = React.useState(
    getIsEatingWindow()
  );

  React.useEffect(() => {
    const interval = setInterval(() => {
      setNowTime(getDateTime());
      setIsEatingWindow(getIsEatingWindow());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div class={"app " + (isEatingWindow ? "eating-window" : "fasting")}>
      <div class="hero">
        <span class="date">{now}</span>
        <h1>{isEatingWindow ? "You Can Eat 😋" : "You Are Fasting Now 😎"}</h1>
        <div class="block">
          {!isEatingWindow && (
            <>
              <h2>Time until your fast end</h2>
              <h2>{getDifferenceToStartEatingWindow()}</h2>
            </>
          )}

          {isEatingWindow && (
            <>
              <h2>Time until your eating window end </h2>
              <h2>{getDifferenceToEndEatingWindow()}</h2>
            </>
          )}
        </div>
        <h3>Your eating window</h3>
        <h3>
          09.00 <i data-feather="arrow-right"></i> 15.00
        </h3>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

feather.replace();
