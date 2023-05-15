import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";

import { LinksCollection } from "./collection";

export async function insertLink({ title, url }) {
  check(title, String);
  check(url, String);
  return await LinksCollection.insertAsync({
    title,
    url,
    createdAt: new Date(),
  });
}

export async function archiveLink({ _id }) {
  check(_id, String);
  return await LinksCollection.updateAsync(
    { _id },
    { $set: { archived: true } },
  );
}

Meteor.methods({ insertLink, archiveLink });
