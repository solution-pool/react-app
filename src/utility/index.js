import Badge from "react-bootstrap/Badge";

{
  /*first wordletter capital*/
}
export const capitalizeName = (name) => {
  return name.replace(/\b(\w)/g, (s) => s.toUpperCase());
};

{
  /*back button*/
}
export const goBack = (e) => {
  e.preventDefault();
  window.history.back();
};

{
  /*back button not show login/signup pages*/
}
export const backBtn = (urlPara) => {
  if (urlPara == "/login") {
    return "";
  } else if (urlPara == "/signup") {
    return "";
  } else {
    return urlPara;
  }
};

{
  /*seleted group member dropdown opton or group at update post time*/
}
export const alreadySeleGroupMems = (allMems, MemsIds, postId) => {
  let resultDt;
  let filtered;
  if (allMems.length > 0 && MemsIds.length > 0 && postId != undefined) {
    resultDt = allMems.map((value, index) => {
      if (MemsIds.includes(value.id)) {
        return value;
      }
    });

    filtered = resultDt.filter(function (arrVal) {
      return arrVal !== undefined;
    });
    return filtered;
  } else {
    return (filtered = []);
  }
};
{
  /*seleted group member dropdown opton or group at update post media time*/
}
export const alreadySeleGroup = (allGroup, groupsIds, postId) => {
  let resultDt;
  let filtered;
  if (
    allGroup != undefined &&
    allGroup.length > 0 &&
    groupsIds != undefined &&
    groupsIds.length > 0 &&
    postId != undefined
  ) {
    resultDt = allGroup.map((value, index) => {
      if (groupsIds.includes(value.group_id)) {
        return value;
      }
    });

    filtered = resultDt.filter(function (arrVal) {
      return arrVal !== undefined;
    });
    return filtered;
  } else {
    return (filtered = []);
  }
};

{
  /*Current time and date*/
}
export const ctDateTime = () => {
  const ctDate = new Date().toLocaleDateString().split("/");
  var utcTime = new Date().toUTCString().split(" ");
  const ctUtcTime = utcTime[4].split(":");
  return `${ctDate[2]}-0${ctDate[0]}-${ctDate[1]}T${ctUtcTime[0]}:${ctUtcTime[1]}`;
};

const returnCurrentTime = (postExpireTimeType) => {
  if (postExpireTimeType > 0 && postExpireTimeType <= 5) {
    const utcTime = new Date().toUTCString().split(" ");
    const get_ctUtcTime = utcTime[4].split(":");
    const ctTotalMinutes =
      parseInt(get_ctUtcTime[0]) * 60 + parseInt(get_ctUtcTime[1]);
    return ctTotalMinutes;
  }
  if (postExpireTimeType == 6) {
    // const utcTime = new Date().toUTCString().split(' ');
    const year = new Date(new Date().toUTCString()).getUTCFullYear();
    const month = new Date(new Date().toUTCString()).getUTCMonth() + 1;
    const dates = new Date(new Date().toUTCString()).getUTCDate();
    const hours = new Date(new Date().toUTCString()).getUTCHours();
    const minutes = new Date(new Date().toUTCString()).getUTCMinutes();
    const ctTotalMinutes = `${year} ${month} ${dates} ${hours} ${minutes}`;
    console.log("ctTotalMinutes", ctTotalMinutes);
    return ctTotalMinutes;
  }
};

const returnCreateExpiryTime = (
  postExpireTimeType,
  created_at,
  postExpiryTime
) => {
  if (postExpireTimeType > 0 && postExpireTimeType <= 5) {
    let convertToMinu;
    if (parseInt(postExpireTimeType) === 1) {
      convertToMinu = parseInt(postExpiryTime);
    }
    if (parseInt(postExpireTimeType) === 2) {
      convertToMinu = parseInt(postExpiryTime) * 60;
    }
    if (parseInt(postExpireTimeType) === 3) {
      convertToMinu = parseInt(postExpiryTime) * 24 * 60;
    }
    if (parseInt(postExpireTimeType) === 4) {
      convertToMinu = 24 * 60 * 7 * parseInt(postExpiryTime);
    }
    if (parseInt(postExpireTimeType) === 5) {
      convertToMinu = 24 * 60 * 30 * parseInt(postExpiryTime);
    }

    const createdPostUtcHoursMinu = created_at.split(" ");
    const createdPostUtcTime = createdPostUtcHoursMinu[1].split(":");
    const createdPostTotalMinutes =
      parseInt(createdPostUtcTime[0]) * 60 +
      parseInt(createdPostUtcTime[1]) +
      convertToMinu;
    return createdPostTotalMinutes;
  }
  if (postExpireTimeType == 6) {
    const postCreatedData = new Date(postExpiryTime);
    // const months = new Date(postExpiryTime).getUTCMonth()+1;
    // const dates = new Date(postExpiryTime).getUTCDate();

    const year = new Date(postExpiryTime).getUTCFullYear();
    const month = new Date(postExpiryTime).getUTCMonth() + 1;
    const dates = new Date(postExpiryTime).getUTCDate();
    const hours = new Date(postExpiryTime).getUTCHours();
    const minutes = new Date(postExpiryTime).getUTCMinutes();

    const createdPostUtcHoursMinu = postCreatedData.toUTCString().split(" ");
    console.log(
      "postCreatedData",
      `${year} ${month} ${dates} ${hours} ${minutes}`
    );
    // const createdPostUtcTime = createdPostUtcHoursMinu[4].split(':');
    // const createdPostTotalMinutes = parseInt(createdPostUtcTime[0]) * 60 +  parseInt(createdPostUtcTime[1]);
    return `${year} ${month} ${dates} ${hours} ${minutes}`;
  }
};

export const checkPostExpiry = (
  created_date,
  post_expire_time_type,
  post_expiry_time
) => {
  console.log("UTCMONTH", new Date(new Date().toUTCString()).getUTCFullYear());
  if (parseInt(post_expire_time_type) === 1) {
    const getMinuteDiff =
      returnCreateExpiryTime(
        post_expire_time_type,
        created_date,
        post_expiry_time
      ) - returnCurrentTime(1);
    if (getMinuteDiff > 0 && getMinuteDiff <= 15) {
      return (
        <Badge pill variant="danger">
          {" "}
          {`Post Will Be Expire After ${getMinuteDiff} Minute`}{" "}
        </Badge>
      );
    }
  } else if (parseInt(post_expire_time_type) === 2) {
    const getMinuteDiff =
      returnCreateExpiryTime(
        post_expire_time_type,
        created_date,
        post_expiry_time
      ) - returnCurrentTime(2);

    if (getMinuteDiff > 0 && getMinuteDiff <= 1440) {
      return (
        <Badge pill variant="danger">
          {" "}
          {`Post Will Be Expire After ${Math.round(
            getMinuteDiff / 60
          )} Hour`}{" "}
        </Badge>
      );
    }
  } else if (parseInt(post_expire_time_type) === 3) {
    const getMinuteDiff =
      returnCreateExpiryTime(
        post_expire_time_type,
        created_date,
        post_expiry_time
      ) - returnCurrentTime(3);

    if (getMinuteDiff > 0 && getMinuteDiff <= 10080) {
      return (
        <Badge pill variant="danger">
          {" "}
          {`Post Will Be Expire After ${Math.round(
            getMinuteDiff / 1440
          )} Day`}{" "}
        </Badge>
      );
    }
  } else if (parseInt(post_expire_time_type) === 4) {
    const getMinuteDiff =
      returnCreateExpiryTime(
        post_expire_time_type,
        created_date,
        post_expiry_time
      ) - returnCurrentTime(4);
    if (getMinuteDiff > 0 && getMinuteDiff <= 282240) {
      return (
        <Badge pill variant="danger">
          {" "}
          {`Post Will Be Expire After ${Math.round(
            getMinuteDiff / 10080
          )} Week`}{" "}
        </Badge>
      );
    }
  } else if (parseInt(post_expire_time_type) === 5) {
    const getMinuteDiff =
      returnCreateExpiryTime(
        post_expire_time_type,
        created_date,
        post_expiry_time
      ) - returnCurrentTime(5);

    if (getMinuteDiff > 0 && getMinuteDiff <= 518400) {
      return (
        <Badge pill variant="danger">
          {" "}
          {`Post Will Be Expire After ${Math.round(
            getMinuteDiff / 43200
          )} Month`}{" "}
        </Badge>
      );
    }
  } else if (parseInt(post_expire_time_type) === 6) {
    const customDateTime = returnCreateExpiryTime(
      post_expire_time_type,
      created_date,
      post_expiry_time
    ).split(" ");
    const currentDateTime = returnCurrentTime(6).split(" ");

    const year =
      parseInt(customDateTime[0]) > parseInt(currentDateTime[0])
        ? parseInt(customDateTime[0]) - parseInt(currentDateTime[0]) > 1
          ? parseInt(customDateTime[0]) -
            parseInt(currentDateTime[0]) +
            " " +
            "Years"
          : parseInt(customDateTime[0]) -
            parseInt(currentDateTime[0]) +
            " " +
            "Year"
        : "";

    const months =
      parseInt(customDateTime[1]) > parseInt(currentDateTime[1])
        ? parseInt(customDateTime[1]) - parseInt(currentDateTime[1]) > 1
          ? parseInt(customDateTime[1]) -
            parseInt(currentDateTime[1]) +
            " " +
            "Months"
          : parseInt(customDateTime[1]) -
            parseInt(currentDateTime[1]) +
            " " +
            "Month"
        : "";

    const days =
      parseInt(customDateTime[2]) > parseInt(currentDateTime[2])
        ? parseInt(customDateTime[2]) - parseInt(currentDateTime[2]) > 1
          ? parseInt(customDateTime[2]) -
            parseInt(currentDateTime[2]) +
            " " +
            "Days"
          : parseInt(customDateTime[2]) -
            parseInt(currentDateTime[2]) +
            " " +
            "Day"
        : "";

    const Hours =
      parseInt(customDateTime[3]) > parseInt(currentDateTime[3])
        ? parseInt(customDateTime[3]) - parseInt(currentDateTime[3]) > 1
          ? parseInt(customDateTime[3]) -
            parseInt(currentDateTime[3]) +
            " " +
            "Hours"
          : parseInt(customDateTime[3]) -
            parseInt(currentDateTime[3]) +
            " " +
            "Hour"
        : "";

    const Minutes =
      parseInt(customDateTime[4]) > parseInt(currentDateTime[4])
        ? parseInt(customDateTime[4]) - parseInt(currentDateTime[4]) > 1
          ? parseInt(customDateTime[4]) -
            parseInt(currentDateTime[4]) +
            " " +
            "Minutes"
          : parseInt(customDateTime[4]) -
            parseInt(currentDateTime[4]) +
            " " +
            "Minute"
        : "";

    // const year = parseInt(customDateTime) > parseInt(currentDateTime) ? parseInt(customDateTime) - parseInt(currentDateTime)+' '+'Year' : '';

    return (
      <Badge pill variant="danger">
        {" "}
        {`Post Will Be Expire After ${year} ${months} ${days} ${Hours} ${Minutes}`}{" "}
      </Badge>
    );
    console.log(
      "getMinuteDiff",
      customDateTime,
      currentDateTime,
      year,
      months,
      days,
      Hours
    );
    // if(getMinuteDiff > 0 && getMinuteDiff <= 15){
    //   return  <Badge pill variant="danger"> {`Post Will Be Expire After ${getMinuteDiff} Minute`} </Badge>
    // }
  }
};

export const subscriptionPostExpiryTime = (
  subscPostExpTime,
  subsPostTimeType
) => {
  if (subsPostTimeType === 1) {
    const subsTime = subscPostExpTime > 1 ? "Days" : "Day";
    return (
      <Badge pill variant="success">
        {" "}
        {` ${subscPostExpTime} ${subsTime} Subscription`}{" "}
      </Badge>
    );
  } else if (subsPostTimeType === 2) {
    const subsTime = subscPostExpTime > 1 ? "Months" : "Month";
    return (
      <Badge pill variant="success">
        {" "}
        {`${subscPostExpTime} ${subsTime} Subscription`}{" "}
      </Badge>
    );
  } else if (subsPostTimeType === 3) {
    const subsTime = subscPostExpTime > 1 ? "Quarters" : "Quarter";
    return (
      <Badge pill variant="success">
        {" "}
        {`${subscPostExpTime} ${subsTime} Subscription`}{" "}
      </Badge>
    );
  } else if (subsPostTimeType === 4) {
    const subsTime = subscPostExpTime > 1 ? "Years" : "Year";
    return (
      <Badge pill variant="success">
        {" "}
        {`${subscPostExpTime} ${subsTime} Subscription`}{" "}
      </Badge>
    );
  }
};


//Check subscription duration
export const subsDuraType = (subscDuraType) => {
  switch (subscDuraType) {
    case 1:
      return "One Day";
      break;
    case 2:
      return "One Week";
      break;
    case 3:
      return "One Month";
      break;
    case 4:
      return "Six Month";
      break;
    case 5:
      return "One Year";
      break;
    default:
      return "";
  }
};

//Remove duplicate object inside array
export const isEmptyObj = (arrObj)=> {
  return Object.keys(arrObj).length >= 1;
}