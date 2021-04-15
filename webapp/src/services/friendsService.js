import ldflex from "@solid/query-ldflex";
import FC from "solid-file-client";
import auth from "solid-auth-client";

export default class FriendsService {

  constructor() {
    this.webId = "";
    this.errorAdd = false;
    this.errorDelete = false;
    this.errorRequest = null;
  }

  /**
   * Método para añadir un nuevo amigo
   */
  async add(friendWebId) {
    const auth = require("solid-auth-client");
    await auth.trackSession((session) => {
      if (!session) {
        return;
      } else {
        this.webId = session.webId;
      }
    });
    try {
      await ldflex[this.webId].knows.add(ldflex[friendWebId]);
    } catch (e) {
      this.errorAdd = true;
    }
  }

  /**
   * Obtener sesion
   */
   async obtainSessionFc() {
    const fc = new FC(auth);
    let session = await auth.currentSession();
    if (!session) {
      session = await auth.login();
    }
    return fc;
  }


 /**
   * Hacer peticion a webId
   */
  async request(op) {
    try {
      return await op(await this.obtainSessionFc());
    } catch (error) {
      this.errorRequest = "Error en la petición";
    }
  }

  async checkOrigin(friendWebId) {
      return await this.request(async (client) => await client.itemExists(friendWebId));
    }

  async exists(friendWebId) {
      return await this.checkOrigin(friendWebId);
    }

      /**
   * Método para comprobar si ya sois amigos
   */
  async check(friendWebId) {
    const auth = require("solid-auth-client");
    await auth.trackSession((session) => {
      if (!session) {
        return;
      } else {
        this.webId = session.webId;
      }
    });
    for await (const friend of ldflex[this.webId].friends) {
      if (String(friend).localeCompare(String(friendWebId)) === 0) {
        return await true;
      }
    }
    return await false;
  }

   /**
   * Metodo para borrar amigo
   */
    async delete(friendWebId) {
        const auth = require("solid-auth-client");
        await auth.trackSession((session) => {
          if (!session) {
            return;
          } else {
            this.webId = session.webId;
          }
        });
        try {
          await ldflex[this.webId].knows.delete(ldflex[friendWebId]);
        } catch(e) {
          this.errorDelete = true;
        }
      }

}