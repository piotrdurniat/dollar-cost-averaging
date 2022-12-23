import { describe, it } from "vitest";
import App from "./App";
import { RecoilRoot } from "recoil";
import { render } from "./util/test-utils";
import "./i18n/i18n";

describe("App", () => {
  it("renders App component", () => {
    render(
      <RecoilRoot>
        <App />
      </RecoilRoot>
    );
  });
});
