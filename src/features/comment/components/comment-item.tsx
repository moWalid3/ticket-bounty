import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { CommentWithMetadata } from "../types";

type CommentItemProps = {
  comment: CommentWithMetadata;
  buttons: React.ReactNode[];
};

const CommentItem = ({ comment, buttons }: CommentItemProps) => {
  return (
    <div className="flex gap-x-1.25">
      <Card className="p-4 flex-1 flex flex-col gap-y-1">
        <div className="flex justify-between text-sm text-muted-foreground">
          <p>
            {comment.isOwner
              ? "You"
              : (comment.user?.username ?? "Deleted User")}
          </p>
          <p>{format(comment.createdAt, "yyyy-MM-dd, HH:mm")}</p>
        </div>
        <p className="whitespace-pre-line">{comment.content}</p>
      </Card>

      <div className="flex flex-col gap-y-1">{buttons}</div>
    </div>
  );
};

export { CommentItem };
