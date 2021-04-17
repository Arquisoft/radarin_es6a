import React from "react";
import { useWebId } from "@inrupt/solid-react-components";
import MyFriends from "./myFriends";
import friendsService from "../../services/friendsService";

export const friends = () => {
  const webId = useWebId();

  return (
    <section data-testid="friendsTest" class="amigos" >
      <MyFriends myWebId={webId} service={new friendsService()}/>
    </section>
  );
};

export default friends;