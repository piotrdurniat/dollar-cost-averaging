import { RecoilRoot } from "recoil";
import { describe, it } from "vitest";
import App from "./App";
import "./i18n/i18n";
import { render, screen } from "./util/test-utils";

describe("App", () => {
  it("renders App component in dark mode", () => {
    window.localStorage.setItem("themeMode", JSON.stringify("dark"));
    testApp();
  });

  it("renders App component in light mode", () => {
    window.localStorage.setItem("themeMode", JSON.stringify("light"));
    testApp();
  });

  const testApp = () => {
    render(
      <RecoilRoot>
        <App />
      </RecoilRoot>,
    );

    // check if app bar is rendered
    expect(screen.getByRole("banner")).toBeInTheDocument();

    // check if home page is rendered
    expect(screen.getByRole("main")).toBeInTheDocument();
  };
});
