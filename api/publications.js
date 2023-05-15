import { Meteor } from "meteor/meteor";

import { LinksCollection } from "./collection";

Meteor.publish("activeLinks", function publishActiveLinks() {
  return LinksCollection.find(
    { archived: { $ne: true } },
    { fields: { title: 1, url: 1, createdAt: 1 }, sort: { createdAt: -1 } },
  );
});
