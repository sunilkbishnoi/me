import { StartServer } from "@tanstack/react-start/server";
import { getRouter } from "./router";

export default function render() {
  return <StartServer router={getRouter()} />;
}
