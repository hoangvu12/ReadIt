import { useQuery } from "react-query";
import { getManga } from "../services/manga";

const useManga = (type: "latest" | "recommended" = "recommended") => {
  return useQuery(["anime", type], () => getManga(type));
};

export default useManga;
