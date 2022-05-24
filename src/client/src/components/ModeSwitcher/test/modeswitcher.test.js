import ModeSwitcher from "../ModeSwitcher";
import userEvent from "@testing-library/user-event";
import { cleanup } from "@testing-library/react";
import customRender from "../../../utils/reduxTestRender";

// another method to do the above
//   it("should render correctly in eyepice mode", () => {
//     customRender(<ModeSwitcher />);
//     const elem = screen.getByText(/eyepiece/i);
//     expect(elem).toBeInDocument();
//   });

describe("modeswitcher", () => {
  let user;
  let containerDiv;
  let switchButton;
  let component;
  beforeEach(() => {
    component = customRender(<ModeSwitcher />);
    containerDiv = component.queryByTestId("mode-switcher");
    switchButton = containerDiv.firstChild;
    user = userEvent.setup();
  });

  afterEach(() => cleanup());

  it("should render in ON position (eyepiece mode))", () => {
    expect(containerDiv).toBeTruthy();
    expect(switchButton.className.includes("off")).toBe(false);

    component.unmount();
  });

  // try puttng in describe block
  it("should turn to OFF position on first user click", async () => {
    const cameraSpan = switchButton.firstChild.childNodes[0];

    await user.click(cameraSpan);

    expect(switchButton.className.includes("off")).toBe(true);
  });

  it("should turn to ON position on dobbleclick", async () => {
    const cameraSpan = switchButton.firstChild.childNodes[0];
    const eyepieceSpan = switchButton.firstChild.childNodes[1];
    expect(switchButton.className.includes("off")).toBe(false);

    await user.click(cameraSpan);
    await user.click(eyepieceSpan);

    expect(switchButton.className.includes("off")).toBe(false);
  });
});
