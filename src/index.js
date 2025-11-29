import React from "react";
import { createRoot } from "react-dom/client";
import Doxy from "./Doxy";
import "./index.css";

const root = createRoot(document.getElementById("root"));
root.render(<Doxy />);
