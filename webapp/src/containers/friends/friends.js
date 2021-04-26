import React from "react";
import { useWebId } from "@inrupt/solid-react-components";
import MyFriends from "./myFriends";
import friendsService from "../../services/friendsService";
import {PanelAmigos} from"./myFriends.style.js";

export const friends = () => {
  const webId = useWebId();

  return (
    <PanelAmigos data-testid="friendsTest" >
      <MyFriends myWebId={webId} service={new friendsService()}/>
    </PanelAmigos>
  );
};

export default friends;