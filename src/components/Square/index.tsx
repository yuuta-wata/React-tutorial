import { FC } from "react";

import type { Props } from "./type";

export const Square: FC<Props> = ({ value, onClick }) => (
  <button className="square" onClick={onClick}>
    {value}
  </button>
);
