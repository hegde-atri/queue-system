import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { useAuthActions } from "@convex-dev/auth/react";
import { LogOut } from "lucide-react";
import Link from "next/link";

export function AuthMenu() {
	const user = useQuery(api.user.currentUser);
  const { signOut } = useAuthActions();

  const getInitials = (name?: string) => {
    if (!name) return "";
    return name
        .split(" ")
        .map(part => part.charAt(0))
        .join("")
        .toUpperCase();
};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className="cursor-pointer">
					<AvatarImage src={user?.image} alt={user?.name} />
          <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel className="font-bold">
					Welcome {user?.name?.split(" ")[0]}
				</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild><Link href="/dashboard">Manage Queues</Link></DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => void signOut()}> <LogOut /> Log out</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
