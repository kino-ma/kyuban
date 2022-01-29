import { UserData } from "../common/types";
import { UserName } from "./userName";

interface IPeopleListProps {
  people: UserData[];
}

export const PeopleList = ({ people }: IPeopleListProps) => {
  const personItems = people.map((person) => <UserName user={person} />);

  return <div>{personItems}</div>;
};
