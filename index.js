const App = () => {
  const [now, setNowTime] = React.useState(getNow());
  const [isEatingWindow, setIsEatingWindow] = React.useState(
    getIsEatingWindow(now)
  );

  React.useEffect(() => {
    const interval = setInterval(() => {
      setNowTime(getNow());
      setIsEatingWindow(getIsEatingWindow(now));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div class={"app " + (isEatingWindow ? "eating-window" : "fasting")}>
      <div class="hero">
        <span class="date">{getDateTime(now)}</span>
        <h1>{isEatingWindow ? "You Can Eat 😋" : "You Are Fasting Now 😎"}</h1>
        <div class="block">
          {!isEatingWindow && (
            <>
              <h2>Time until your fast end</h2>
              <h2>{getDifferenceToStartEatingWindow(now)}</h2>
            </>
          )}

          {isEatingWindow && (
            <>
              <h2>Time until your eating window end </h2>
              <h2>{getDifferenceToEndEatingWindow(now)}</h2>
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

module.exports = {
  getNow
};
