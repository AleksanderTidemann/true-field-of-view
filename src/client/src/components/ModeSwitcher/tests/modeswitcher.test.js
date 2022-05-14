import ModeSwitcher from "../ModeSwitcher";
import userEvent from "@testing-library/user-event";
import { fireEvent, render, screen } from "@testing-library/react";
import customRender from "../../../utils/reduxTestRender";

describe("modeswitcher", () => {
  it("renders correctly in eyepiece mode", () => {
    const component = customRender(<ModeSwitcher />);
    const containerDiv = component.queryByTestId("mode-switcher");
    const switchButton = containerDiv.firstChild;

    expect(containerDiv).toBeTruthy();
    expect(switchButton.className.includes("off")).toBe(false);
  });

  // another method
  //   it("should render correctly in eyepice mode", () => {
  //     customRender(<ModeSwitcher />);
  //     const elem = screen.getByText(/eyepiece/i);
  //     expect(elem).toBeInDocument();
  //   });

  it("should turn to camera mode on user click", async () => {
    const component = customRender(<ModeSwitcher />);
    const user = userEvent.setup();
    const containerDiv = component.queryByTestId("mode-switcher");
    const switchButton = containerDiv.firstChild;
    const cameraSpan = switchButton.firstChild.childNodes[0];

    await user.click(cameraSpan);

    expect(switchButton.className.includes("off")).toBe(true);
  });
});
