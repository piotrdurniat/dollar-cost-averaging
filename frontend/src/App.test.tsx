import { describe, it } from "vitest";
import App from "./App";
import { RecoilRoot } from "recoil";
import { render } from "./util/test-utils";

describe("App", () => {
  it("renders App component", () => {
    render(
      <RecoilRoot>
        <App />
      </RecoilRoot>
    );
  });
});
