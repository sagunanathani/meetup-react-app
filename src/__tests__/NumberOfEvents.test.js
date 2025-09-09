import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfEvents";
import { useState } from "react";

test("renders number input and calls onNumberChange", async () => {
  const user = userEvent.setup();

  // Wrapper to manage controlled component state
  const Wrapper = () => {
    const [number, setNumber] = useState(32);
    return <NumberOfEvents number={number} onNumberChange={setNumber} />;
  };

  render(<Wrapper />);

  const input = screen.getByRole("spinbutton");
  expect(input).toHaveValue(32);

  // Type 10
  await user.clear(input);
  await user.type(input, "10");

  expect(input).toHaveValue(10); // Now controlled value updates
});
