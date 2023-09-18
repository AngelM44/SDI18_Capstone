import React from "react";
import { EuiCard, EuiIcon, EuiDescriptionList } from "@elastic/eui";

const data = [
  {
    title: "Location:",
    description: "Base Name",
  },
  {
    title: "Availibility:",
    description: "Info on schedule",
  },
  {
    title: "Contact Info:",
    description: "Email Link",
  },
  {
    title: "Social Media:",
    description: "Filler links/Icons",
  },
];

const cardFooterContent = (
  <EuiDescriptionList
    type="column"
    listItems={data}
    // style={{ maxWidth: "420px" }}
  />
);

const UserProfilePanel = () => (
  <EuiCard
    style={{ marginTop: "10px" }}
    textAlign="left"
    // href="https://elastic.github.io/eui/"
    image="https://source.unsplash.com/532x532/?City"
    icon={<EuiIcon size="xxl" type="logoBeats" />}
    title={"First Name Last Name"}
    footer={cardFooterContent}
  />
);

export default UserProfilePanel;
