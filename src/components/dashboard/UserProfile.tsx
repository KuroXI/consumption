import { type Session } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type UserProfileProps = {
  session: Session;
};

export const UserProfile = ({ session }: Readonly<UserProfileProps>) => {
  return (
    <Avatar>
      <AvatarImage src={session.user.image!} alt={session.user.id} />
      <AvatarFallback>{session.user.name?.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};
