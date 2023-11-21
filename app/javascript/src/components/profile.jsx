import React from "react";
import { useSelector } from "react-redux";

import { AppLayout } from "./app_layout";

export const Profile = () => {
  const { user } = useSelector((state) => state.user);

  return(
    <AppLayout>
      <div>
        {JSON.stringify(user)}
      </div>
    </AppLayout>
  );
};
