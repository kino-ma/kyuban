import { MouseEvent } from "react";
import { Button } from "./button";

interface IFollowButtonProps {
  following: boolean;
  onClickFollowing: FollowButtonEventHandler;
  onClickNotFollowing: FollowButtonEventHandler;
}

export type FollowButtonEventHandler = (event: MouseEvent) => Promise<void>;

export const FollowButton: React.FC<
  IFollowButtonProps & React.HTMLAttributes<HTMLButtonElement>
> = ({ following, onClickFollowing, onClickNotFollowing, ...props }) => {
  const onClick = following ? onClickFollowing : onClickNotFollowing;
  const text = following ? "フォロー済み" : "フォローする";

  const button = (
    <Button {...{ ...props, onClick: async (evt) => await onClick(evt) }}>
      {text}
    </Button>
  );

  return button;
};
