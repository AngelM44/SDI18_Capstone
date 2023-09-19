import { EuiCard, EuiDescriptionList } from "@elastic/eui";

const UserProfilePanel = ({ data }) => {
  // const [profileData, setProfileData] = useState(props);

  const cardFooterContent = (
    <EuiDescriptionList
      type="column"
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
      // style={{ maxWidth: "420px" }}
    />
  );

  return (
    <>
      <EuiCard
        style={{ marginTop: "10px" }}
        textAlign="left"
        // href="https://elastic.github.io/eui/"
        image="../profile_pics/profile-pic5.png"
        title={`${data.first_name} ${data.last_name}`}
        footer={cardFooterContent}
      />
    </>
  );
};

export default UserProfilePanel;
