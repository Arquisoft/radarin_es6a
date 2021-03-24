import React from "react";
import { useWebId } from "@inrupt/solid-react-components";
import MyFriends from "./myFriends";
import friendsService from "../../services/friendsService";
import { Row, Col } from "react-bootstrap";

export const friends = () => {
  const webId = useWebId();

  return (
    <section data-testid="friendsTest" style={{ overflowX : "hidden" }}>
      <Row>
        <Col>
          <MyFriends myWebId={webId} service={new friendsService()}/>
        </Col>
      </Row>
    </section>
  );
};

export default friends;