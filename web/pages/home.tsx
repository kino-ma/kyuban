import { NextPage } from "next";
import { get } from "../common/api";
import { getCurrentUser, getSession } from "../common/auth";
import { ResponseData, ThreadData, UserData } from "../common/types";
import { ResponseCard } from "../components/ResponseCard";

interface IHomeProps {
  responses: ResponseData[];
  threads: ThreadData[];
}

const Home: NextPage<IHomeProps> = ({ responses, threads }) => {
  console.log({ threads, responses });
  const thread = threads[0];
  const response = responses[0];
  console.log({ thread, response });
  return <ResponseCard {...{ thread, response }} />;
};

Home.getInitialProps = async (ctx) => {
  const session = getSession(ctx);

  const responsesResp = await get("/response/feed", { session });
  const threadsResp = await get("/thread");

  const { responses } = await responsesResp.json();
  const { threads } = await threadsResp.json();

  return {
    responses,
    threads,
  };
};

export default Home;
