import React from "react";
import { useTranslation } from "react-i18next";
import { NotificationContainer, NotificationManager } from "react-notifications";
import FriendList from "../../components/Friends/friendsList";
import {ListFriend,ButtonAddFriend,InputAdd,SpanFriend,ModalApp, AddFriend} from"./myFriends.style.js";
import { useNotification } from "@inrupt/solid-react-components";



export const myFriends = ({ myWebId, service }) => {

  
  const { t } = useTranslation();
  const webId = myWebId;
  const { createNotification, discoverInbox } = useNotification(
    webId
  );

  /**
   * Mandar notificacion
   */
  const sendNotification = async (userWebId, content) => {
    try {
      const inboxUrl = await discoverInbox(userWebId);
      if (!inboxUrl) {
        throw new Error("Inbox not found");
      }
      createNotification(
        {
          title: "Friend notification",
          summary: content,
          actor: webId
        },
        inboxUrl
      );
    } catch (ex) {
      NotificationManager.error(t("notifications.notificationErrorMessage"), t("notifications.notificationErrorTitle"), 3000);
    }
  };

  /**
   * Añadir nuevo amigo
   */
  async function addFriend() {
    let fService = service;
    let friendWebId = document.getElementById("friendId").value;
    let checkFriend = await fService.check(friendWebId);
    if (typeof (friendWebId) !== "undefined") {
      if (await fService.exists(friendWebId) && friendWebId.localeCompare("") !== 0) {
        if (checkFriend) {
          NotificationManager.error(t("friends.checkErrorMessage"), t("friends.addErrorTitle"), 3000);
        } else {
          await fService.add(friendWebId);
          if (!fService.errorAdd) {
            let text = "User: ".concat(webId).concat(", added you to his/her friend list");
            await sendNotification(friendWebId, text);
            window.location.reload(true);
          } else {
            NotificationManager.error(t("friends.permissionsErrorMessage"), t("friends.addErrorTitle"), 3000);
          }
        }
      } else {
        NotificationManager.error(t("friends.addErrorMessage"), t("friends.addErrorTitle"), 3000);
      }
    }
  }

  /**
   * Eliminar amigo seleccionado
   */
  async function deleteFriend() {
    let fService = service;
    let friends = document.getElementsByName("friendList");
    let buttons = document.getElementsByName("friend");
    let friendsWebId = [];
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[parseInt(i)].checked) {
        friendsWebId.push(friends[parseInt(i)].innerText);
      }
    }
    if (typeof (friendsWebId) !== "undefined" && friendsWebId.length > 0) {
      for (let i = 0; i < friendsWebId.length; i++) {
        await fService.delete(friendsWebId[parseInt(i)]);
        if (!fService.errorDelete) {
          let text = "User: ".concat(webId).concat(", deleted you from his/her friend list");
          await sendNotification(friendsWebId[parseInt(i)], text);
          window.location.reload(true);
        } else {
          NotificationManager.error(t("friends.permissionsErrorMessage"), t("friends.deleteErrorTitle"), 3000);
        }
      }
    } else {
      NotificationManager.error(t("friends.deleteErrorMessage"), t("friends.deleteErrorTitle"), 3000);
    }
  }

  return (
    <center>
    <div data-testid="friendsTest">
      <ModalApp>
        <div className="modal-header">
          <h2>{t("friends.title")}</h2>
          <hr/>
        </div>
        <div className="modal-body">
          <SpanFriend className="span-friends">{t("friends.addTitle")}</SpanFriend>
          <AddFriend className="add-friends">
            <InputAdd data-testid="input-add" className="input-add" id="friendId" type="text"
                   placeholder="https://uoxxxxxx.inrupt.net/"></InputAdd>
          </AddFriend>
          <div>
          <ButtonAddFriend id="btnAdd" data-testid="btnAddFriend" className="correct-margin" onClick={addFriend}>
              {t("friends.add")}
            </ButtonAddFriend>
          </div>
          <br/>
          <SpanFriend className="span-friends">{t("friends.deleteTitle")}</SpanFriend>
          <ListFriend className="list-friends">
            <FriendList  src="user.friends" nameList="friendList" nameCk="friend"></FriendList >
          </ListFriend>
          <div>
            <ButtonAddFriend id="deleteFriend" data-testid="btnDeleteFriend" className="correct-margin" onClick={deleteFriend}>
              {t("friends.delete")}
            </ButtonAddFriend>
          </div>
        </div>
      </ModalApp>
      <NotificationContainer/>
      
    </div>
    </center>
  );
};

export default myFriends;