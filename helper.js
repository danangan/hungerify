let IS_DEBUG = false;

let DEBUG_HOUR = 16;

const DATE_TIME_FORMAT = "dddd, MMM Do HH:mm:ss";

const durationFormatter = duration => {
  return `${duration.get("hours")} hours, ${duration.get(
    "minutes"
  )} minutes and ${duration.get("seconds")} seconds`;
};

const getNow = () => {
  if (IS_DEBUG) {
    return moment()
      .hours(DEBUG_HOUR)
      .minutes(0)
      .seconds(0);
  } else return moment();
};

const getNextDay = now => {
  return now.clone().add(1, "days");
};

const getDateTime = now => {
  return now.clone().format(DATE_TIME_FORMAT);
};

const getEndEatingWindowToday = now => {
  const time = now.clone();
  return time
    .hours(15)
    .minutes(0)
    .seconds(0);
};

const getStartEatingWindowToday = now => {
  const time = now.clone();
  return time
    .hours(9)
    .minutes(0)
    .seconds(0);
};

const getStartEatingWindowNextDay = now => {
  const time = now.clone();
  return getNextDay(time)
    .hours(9)
    .minutes(0)
    .seconds(0);
};

const getDifferenceToEndEatingWindow = now => {
  const endTime = getEndEatingWindowToday(now);
  const duration = moment.duration(endTime.diff(now));
  return durationFormatter(duration);
};

const getDifferenceToStartEatingWindow = now => {
  const startTimeToday = getStartEatingWindowToday(now); // 9 today
  const startTimeNextDay = getStartEatingWindowNextDay(now); // 9 tomorrow

  if (now.isAfter(startTimeToday)) {
    const duration = moment.duration(startTimeNextDay.diff(now));
    return durationFormatter(duration);
  }

  const duration = moment.duration(startTimeToday.diff(now));
  return durationFormatter(duration);
};

const getIsEatingWindow = now => {
  const startEatingWindowToday = getStartEatingWindowToday(now);
  const endEatingWindowToday = getEndEatingWindowToday(now);

  return (
    now.isBefore(endEatingWindowToday) && now.isAfter(startEatingWindowToday)
  );
};

function expect(expected, value) {
  const equal = expected === value;

  if (!equal) console.log(value);

  return equal;
}

// Test
function Test() {
  IS_DEBUG = true;
  DEBUG_HOUR = 16;
  console.log("DEBUG_HOUR", DEBUG_HOUR);

  let result;
  const now = getNow();

  console.log("TEST 1");
  result = getIsEatingWindow(now);
  console.log(
    "getIsEatingWindow should be false, result: ",
    expect(result, false)
  );

  console.log("TEST 2");
  result = getDifferenceToStartEatingWindow(now);
  console.log(
    "getDifferenceToStartEatingWindow should be 17 hours, result: ",
    expect(result, "17 hours, 0 minutes and 0 seconds")
  );

  IS_DEBUG = false;
}

Test();
