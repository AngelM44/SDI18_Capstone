import React from "react";
import ContentLoader from "react-content-loader";
import { EuiCard } from "@elastic/eui";

const ProfileLoader = (props) => (
  <EuiCard textAlign="left">
    <ContentLoader
      speed={2}
      width={1300}
      height={600}
      viewBox="0 0 1300 600"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="461" y="50" rx="3" ry="3" width="600" height="9" />
      <rect x="466" y="100" rx="3" ry="3" width="900" height="9" />
      <rect x="461" y="150" rx="3" ry="3" width="582" height="9" />
      <rect x="466" y="200" rx="3" ry="3" width="540" height="9" />
      <rect x="10" y="2" rx="0" ry="0" width="432" height="500" />
    </ContentLoader>
  </EuiCard>
);
export default ProfileLoader;
