import React from "react";

import PlusIcon from "../assets/icon-plus.svg";
import MinusIcon from "../assets/icon-minus.svg";
import ReplyIcon from "../assets/icon-reply.svg";
import EditIcon from "../assets/icon-edit.svg";
import DeleteIcon from "../assets/icon-delete.svg";

const icons = {
  plus: PlusIcon,
  minus: MinusIcon,
  reply: ReplyIcon,
  edit: EditIcon,
  delete: DeleteIcon,
};

export default function Icon({ name, alt = "" }) {
  const Src = icons[name];
  if (!Src) return null;
  return <img src={Src} alt={alt} />;
}
