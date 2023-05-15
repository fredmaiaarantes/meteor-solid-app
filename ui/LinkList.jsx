import { createSignal, For, onCleanup, Show } from "solid-js";
import { Meteor } from "meteor/meteor";
import { LinksCollection } from "../api/collection";
import { Tracker } from "meteor/tracker";

const EmptyState = ({ links }) => (
  <Show
    when={links().length === 0}
  >
    <div className="gap-x-6 py-5">
      <div className="min-w-0 flex-auto">
        <p className="text-sm font-semibold text-gray-900">
          There are no active links
        </p>
        <p className="mt-1 truncate text-xs text-gray-500">
          Fill out the form above to add a new link.
        </p>
      </div>
    </div>
  </Show>
);

const LinkItem = ({ link, onClick }) => (
  <li className="flex items-center justify-between gap-x-6 py-5">
    <div className="min-w-0 flex-auto">
      <p className="text-sm font-semibold text-gray-900">
        <a href={link.url} target="_blank">{link.title}</a>
      </p>
      <p className="mt-1 truncate text-xs text-gray-500">
        <a href={link.url} target="_blank">{link.url}</a>
      </p>
    </div>
    <button
      onClick={onClick}
      type="button"
      className="rounded-md px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
    >
      Archive
    </button>
  </li>
);

export const LinkList = () => {
  const subscription = Meteor.subscribe("activeLinks");
  const [isReady, setIsReady] = createSignal(false);
  const [links, setLinks] = createSignal([]);

  const fetchLinks = async () => {
    return await LinksCollection.find({}, { sort: { createdAt: -1 } }).fetchAsync();
  }

  const archiveLink = async (link) => {
    await Meteor.callAsync("archiveLink", { _id: link._id });
  }

  const computation = Tracker.autorun(async () => {
    setIsReady(subscription.ready());
    if(isReady()) {
      setLinks(await fetchLinks());
    }
  });

  onCleanup(() => {
    computation.stop()
  });

  return (
    <Show
      when={isReady()}
      fallback={<p className="text-sm">Loading...</p>}
    >
      <ul role="list" className="divide-y divide-gray-100">
        <For each={links()}>
          {(link) => (
            <LinkItem link={link} onClick={() => archiveLink(link)} />
          )}
        </For>
      </ul>
      <EmptyState links={links} />
    </Show>
  );
}
