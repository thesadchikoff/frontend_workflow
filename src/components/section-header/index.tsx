import { Plus } from "lucide-react";
import { PropsWithChildren } from "react";
import { IconSpace } from "../ui/icon-space";

interface SectionHeader extends PropsWithChildren {
  title: string;
  action?: () => void;
}

const SectionHeader = ({ title, children, action }: SectionHeader) => {
  return (
    <div className="w-full py-4 flex items-center justify-between">
      <div className="flex gap-5">
        <h1 className="font-bold text-3xl">{title}</h1>
        {action && (
          <IconSpace onClick={action}>
            <Plus />
          </IconSpace>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default SectionHeader;
