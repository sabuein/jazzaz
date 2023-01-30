// render.js

import { readAndDisplay as file } from "io";
import { curl } from "scraping";

console.log("Bismillah.\r\n");

/*
import {default as xxx} from "./modules/xxx.mjs";
import xxx from "./modules/xxx.mjs";

//

import * as Module from "./modules/module.js";
Module.function1();
Module.function2();
*/

if (HTMLScriptElement.supports?.("importmap")) {
  console.log("Browser supports import maps.\r\n");
  let source = document.getElementById("docSource"),
    preview = document.getElementById("docPreview"),
    submit = document.getElementById("docSubmit");
  file(source, preview, "text");

  const xX = curl("./assets/data/colors.json");
  console.log("xX:", xX);
  console.log("Type of xX:", typeof xX);
}