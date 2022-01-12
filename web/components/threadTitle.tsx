import Link from "next/link";
import { ThreadData } from "../common/types";

interface IThreadTitleProps {
  thread: ThreadData;
}

export const ThreadTitle: React.FC<IThreadTitleProps> = ({ thread }) => {
  return (
    <Link href={`/thread/${thread.id}`}>
      <a>
        <h4>{thread.title}</h4>
      </a>
    </Link>
  );
};
