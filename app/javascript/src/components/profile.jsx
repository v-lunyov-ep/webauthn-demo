import React from "react";
import { useSelector } from "react-redux";
import Table from 'react-bootstrap/Table';

import { AppLayout } from "./app_layout";

export const Profile = () => {
  const { user } = useSelector((state) => state.user);

  return(
    <AppLayout>
      <h1>{`User: ${user.username}`}</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>key</th>
            <th>value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(user).map((item, index) => {
            return(
              <tr key={index}>
                <td>{item[0]}</td>
                <td>{item[1]}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <pre>
        {JSON.stringify(user, undefined, 2)}
      </pre>
    </AppLayout>
  );
};
