import React from "react";
import { EmailList } from "../email/EmailList";
import "../../setupTests";

import { render } from "enzyme";
let wrapper, props;

function createProps(props) {
  return {
    emails: [
      {
        email: "nikhilbhatt@gmail.com",
      },
      {
        email: "nikhilbhatt@gmail.com",
      },
    ],
    ...props,
  };
}
beforeEach(() => {
  props = createProps();
  wrapper = render(<EmailList {...props} />);
});

describe("<EmailList /> rendering", () => {
  it("should render one <Span> ", () => {
    expect(wrapper.find("span")).toHaveLength(2);
  });
});
