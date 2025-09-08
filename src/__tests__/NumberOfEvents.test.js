import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfEvents";

describe("<NumberOfEvents />", () => {
  test("renders number input and changes value", async () => {
    const user = userEvent.setup();
    const updateNumber = jest.fn();

    render(<NumberOfEvents number={0} onNumberChange={updateNumber} />);

    const input = screen.getByRole("spinbutton");

    // Clear input explicitly
    input.value = "";
    await user.type(input, "10");

    expect(input.value).toBe("10");
    expect(updateNumber).toHaveBeenCalledWith(10);
  });
});
