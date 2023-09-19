import { EuiCard, EuiDescriptionList } from "@elastic/eui";

const UserProfilePanel = ({ data }) => {
  const cardFooterContent = (
    <EuiDescriptionList
      type="row"
      listItems={[
        {
          title: "Location:",
          description: `${data.location}`,
        },
        {
          title: "Availibility:",
          description: `${data.availability}`,
        },
        {
          title: "Contact Info:",
          description: `${data.email}`,
        },
        // {
        //   title: "Social Media:",
        //   description: "Filler links/Icons",
        // },
      ]}
    />
  );

  return (
    <>
      <EuiCard
        style={{
          marginTop: "10px",
          minWidth: "300px",
          maxWidth: "500px",
          maxHeight: "60%",
          minHeight: "650px",
        }}
        textAlign="left"
        // href="https://elastic.github.io/eui/"
        image={`${data.profile_pic}`}
        title={`${data.first_name} ${data.last_name}`}
        footer={cardFooterContent}
      />
    </>
  );
};

export default UserProfilePanel;
