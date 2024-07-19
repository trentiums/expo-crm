import { getLeadListAction } from "@redux/actions/lead";
import store from "@redux/store";

export const GET = async (req, res) => {
  console.log("inside call 5");
  return Response.json({ name: "kuldip" });
};
              