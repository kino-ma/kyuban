import { MouseEventHandler } from "react";
import { Button } from "./button";

interface IFollowButtonProps {
  following: boolean;
  onClickFollowing: MouseEventHandler<HTMLButtonElement>;
  onClickNotFollowing: MouseEventHandler<HTMLButtonElement>;
}

export const FollowButton: React.FC<
  IFollowButtonProps & React.HTMLProps<HTMLButtonElement>
> = ({ following, onClickFollowing, onClickNotFollowing, ...props }) => {
  const onClick = following ? onClickFollowing : onClickNotFollowing;
  const text = following ? "フォローする" : "フォロー済み";

  const button = (
    <Button onClick={onClick} {...props}>
      {text}
    </Button>
  );

  return button;
};
