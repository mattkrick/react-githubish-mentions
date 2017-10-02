import React from "react";
import cn from "classnames";
import UserProfiles from "./data.json";

// An example of a user profile data item
// {
//     "username": "stacyreid",
//     "name": "Dawn Maxwell DVM",
//     "sex": "F",
//     "address": "PSC 9265, Box 4544\nAPO AA 70343-1028",
//     "mail": "gparrish@yahoo.com",
//     "birthdate": "2017-01-10"
//   }

const profiles = UserProfiles.sort(
  (a, b) => (a.username < b.username ? -1 : 1)
).map(profile => ({
  ...profile,
  value: profile.username
}));

const MenuItem = props => {
  // react-githubish-mentions provides `active` you provide everything else
  const { active, username } = props;
  return <div className={cn("menuitem", { active: active })}>{username}</div>;
};

const filterProfiles = prefix => {
  if (prefix === "") {
    return profiles.slice(0, 10);
  }
  prefix = prefix.toLowerCase();
  return profiles
    .filter(profile => profile.username.startsWith(prefix))
    .slice(0, 10);
};

export { profiles, filterProfiles, MenuItem };
