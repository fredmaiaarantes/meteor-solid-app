import { createSignal } from "solid-js";

export const App = () => {
  const [counter, setCounter] = createSignal(0);

  const increment = () => {
    setCounter(counter() + 1);
  };

  return (
    <div className="p-4">
    <header>
      <h1 className="text-3xl font-bold text-indigo-800">
        Meteor + Solid + Tailwind
      </h1>
    </header>
    <section>
      <p className="py-4 font-semibold">You've pressed the button {counter()} times.</p>
      <button
        onClick={increment}
        type="button"
        className="rounded bg-indigo-800 px-2 py-1 text-sm text-white"
      >
        Click Me
      </button>
    </section>
    </div>
  );
}
