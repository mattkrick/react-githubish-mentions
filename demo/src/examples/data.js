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

// prepare the data
const profiles = UserProfiles.sort(
  (a, b) => (a.username < b.username ? -1 : 1)
).map(profile => ({
  ...profile,
  value: profile.username
}));

export default profiles;
