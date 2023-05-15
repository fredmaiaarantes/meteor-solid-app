import { Meteor } from "meteor/meteor";

import "../api/methods";
import "../api/publications";

Meteor.startup(() => {
  console.log("Server is started!");
});
