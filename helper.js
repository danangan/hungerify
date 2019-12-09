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

const getEndEatingWindowToday = (now, { hour, minute }) => {
  console.log('{ hour, minute }', { hour, minute });
  const time = now.clone();
  return time
    .hours(hour)
    .minutes(minute)
    .seconds(0);
};

const getStartEatingWindowToday = (now, { hour, minute }) => {
  const time = now.clone();
  return time
    .hours(hour)
    .minutes(minute)
    .seconds(0);
};

const getStartEatingWindowNextDay = (now, { hour, minute }) => {
  const time = now.clone();
  return getNextDay(time)
    .hours(hour)
    .minutes(minute)
    .seconds(0);
};

const getDifferenceToEndEatingWindow = (now, endTime) => {
  const endTimeToday = getEndEatingWindowToday(now, endTime);
  const duration = moment.duration(endTimeToday.diff(now));
  return durationFormatter(duration);
};

const getDifferenceToStartEatingWindow = (now, startTime) => {
  const startTimeToday = getStartEatingWindowToday(now, startTime); // 9 today
  const startTimeNextDay = getStartEatingWindowNextDay(now, startTime); // 9 tomorrow

  if (now.isAfter(startTimeToday)) {
    const duration = moment.duration(startTimeNextDay.diff(now));
    return durationFormatter(duration);
  }

  const duration = moment.duration(startTimeToday.diff(now));
  return durationFormatter(duration);
};

const getIsEatingWindow = (now, startTime, endTime) => {
  const startEatingWindowToday = getStartEatingWindowToday(now, startTime);
  const endEatingWindowToday = getEndEatingWindowToday(now, endTime);

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
  result = getIsEatingWindow(now, { hour: 9, minute: 0 }, { hour: 15, minute: 0 });
  console.log(
    "getIsEatingWindow should be false, result: ",
    expect(result, false)
  );

  console.log("TEST 2");
  result = getDifferenceToStartEatingWindow(now, { hour: 9, minute: 0 });
  console.log(
    "getDifferenceToStartEatingWindow should be 17 hours, result: ",
    expect(result, "17 hours, 0 minutes and 0 seconds")
  );

  IS_DEBUG = false;
}

// Test();
