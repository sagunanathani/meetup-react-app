import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfEvents";
import { useState } from "react";

test("renders number input and calls onNumberChange", async () => {
  const user = userEvent.setup();

  // Wrapper to manage controlled component state
  const Wrapper = () => {
    const [number, setNumber] = useState(32);
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState(""); // no-unused-vars removed

    return (
      <NumberOfEvents
        number={number}
        onNumberChange={setNumber}
        setErrorAlert={setError}
      />
    );
  };

  render(<Wrapper />);

  const input = screen.getByRole("spinbutton");
  expect(input).toHaveValue(32);

  // Clear the input
  await user.clear(input);
  // Type 10
  await user.type(input, "10");

  // Wait for controlled component state to update
  expect(input).toHaveValue(10);
});
