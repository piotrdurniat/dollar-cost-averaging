import { describe, it } from "vitest";
import App from "./App";
import { RecoilRoot } from "recoil";
import { render } from "./util/test-utils";
import "./i18n/i18n";

describe("App", () => {
  it("renders App component in dark mode", () => {
    window.localStorage.setItem("themeMode", JSON.stringify("dark"));

    render(
      <RecoilRoot>
        <App />
      </RecoilRoot>
    );
  });

  it("renders App component in light mode", () => {
    window.localStorage.setItem("themeMode", JSON.stringify("light"));

    render(
      <RecoilRoot>
        <App />
      </RecoilRoot>
    );
  });
});
