import React from "react";
import { EmailCreate } from "../email/EmailCreate";
import "../../setupTests";

import { shallow } from "enzyme";

let wrapper;
beforeEach(() => {
  wrapper = shallow(<EmailCreate />);
});
describe("<EmailCreate /> rendering", () => {
  it("should render one <Form> ", () => {
    expect(wrapper.find("form")).toHaveLength(1);
  });

  it("should render one <input> ", () => {
    expect(wrapper.find("input")).toHaveLength(1);
  });
});

describe("<EmailCreate /> interactions", () => {
  it("should change the state of email input when onChange function of the #emailinput is invoked", () => {
    wrapper
      .find("#emailinput")
      .simulate("change", { target: { value: "someone@gmail.com" } });
    expect(wrapper.state("email")).toEqual("someone@gmail.com");
  });
});
