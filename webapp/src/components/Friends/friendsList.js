import React from "react";
import {useLDflexList} from "@solid/react";
import {List, Ul} from "./friendList.style";


export default function friendList({
                                     src, nameList, nameCk, offset = 0, limit = Infinity, filter = () => true,
                                     container = (items) => <Ul data-testid="friendsList" className="ul-format">{items}</Ul>,
                                     children = (item, index) => <li name={String(nameList)} key={index}>{`${item}`}
                                         <List id = "friendElementInput" data-testid={"_".concat(String(index))} name={String(nameCk)} className="lista" type="checkbox"/></li>,
                                   }){
  const items = useLDflexList(src)
    .filter(filter)
    .slice(offset, +offset + +limit)
    .map(children);
  return container ? container(items) : items;
}
