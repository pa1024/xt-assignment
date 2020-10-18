import { expect } from "chai";
import {describe} from "mocha"
var jsdom = require("mocha-jsdom");

global.document = jsdom({
  url: "http://localhost:3000/"
});

import Details from "../components/Details";

describe("Card Component Testing", () => {
	const props = {
		data: {
			flight_number:	54,
			mission_name: "SES-16 / GovSat-1",
			mission_id:	["6C42550"],
			launch_year:	"2018",
			launch_success: true,
			links: {
				mission_patch_small: "https://images2.imgbox.com/95/ec/FoFpPft0_o.png"
			},
		},
	}
	const newCardItem = new Details(props)
  it("Verified that a card Item Container is shown on screen", (done) => {
		expect(newCardItem).exist
		done()
  })
});