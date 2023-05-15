import { LinkList } from "./LinkList";
import { LinkForm } from "./LinkForm";

export const App = () => (
  <div className="mx-auto max-w-2xl px-6 py-2">
    <header>
      <h1 className="text-xl font-bold text-indigo-900 sm:text-2xl">
        Links To Read
      </h1>
    </header>
    <LinkForm />
    <LinkList />
  </div>
);
