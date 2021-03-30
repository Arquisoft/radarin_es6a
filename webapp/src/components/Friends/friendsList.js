import React from "react";
import {useLDflexList} from "@solid/react";
import "./friendList.css";


export default function friendList({
                                     src, nameList, nameCk, offset = 0, limit = Infinity, filter = () => true,
                                     container = (items) => <ul data-testid="friendsList" className="ul-format">{items}</ul>,
                                     children = (item, index) => <li name={String(nameList)} key={index}>{`${item}`}
                                         <input id = "friendElementInput" data-testid={"_".concat(String(index))} name={String(nameCk)} className="lista" type="checkbox"/></li>,
                                   }){
  const items = useLDflexList(src)
    .filter(filter)
    .slice(offset, +offset + +limit)
    .map(children);
  return container ? container(items) : items;
}
