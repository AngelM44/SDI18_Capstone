import { EuiCard, EuiDescriptionList, EuiIcon } from "@elastic/eui";

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
        // {
        //   title: "Contact Info:",
        //   description: `${data.email}`,
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
        paddingSize="l"
        title={`${data.first_name} ${data.last_name}`}
        titleElement="h2"
        footer={
          <div style={{}}>
            {cardFooterContent}
            <div
              style={{
                display: "flex",
                gap: "10px",
                paddingTop: "20px",
              }}
            >
              <a href={`mailto:${data.email}`}>
                <EuiIcon type="logoGmail" size="xl" />
              </a>
              <span>
                <EuiIcon type="logoSlack" size="xl" />
              </span>
            </div>
          </div>
        }
        // description={cardFooterContent}
      />
    </>
  );
};

export default UserProfilePanel;
