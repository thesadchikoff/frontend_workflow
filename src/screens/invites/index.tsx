import { useQuery } from "@tanstack/react-query";
import SectionHeader from "../../components/section-header";
import subdivisionService from "../../services/subdivision/subdivision.service";
import { IconSpace } from "../../components/ui/icon-space";
import { Check, CheckCheck, X } from "lucide-react";

const InvitesPage = () => {
  const { data, isError, isLoading, isSuccess, error } = useQuery<
    Invite[],
    ServerError
  >({
    queryKey: ["invites"],
    queryFn: subdivisionService.getInvites,
  });
  const GetInvites = () => {
    if (isLoading) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <span>Загрузка заявок...</span>
        </div>
      );
    }
    if (isError) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <span>{error.response.data}</span>
        </div>
      );
    }
    if (isSuccess && data) {
      return data.map((item) => {
        return (
          <div className="p-10 flex flex-col gap-5 bg-[#0F1623] rounded">
            <div className="w-full flex items-center justify-between">
              <span className="text-xl font-bold">
                Заявка #{item.user.user_id}
              </span>
              <div className="flex items-center gap-5">
                <IconSpace title="Принять">
                  <Check size={12} />
                </IconSpace>
                <IconSpace title="Отклонить">
                  <X size={12} />
                </IconSpace>
              </div>
            </div>
            <div>
              <span className="opacity-70">
                Пользователь{" "}
                <strong className="text-blue-800">{item.user.username}</strong>{" "}
                хочет присоединиться к отделу{" "}
                {item.subdivision.subdivision_name}
              </span>
            </div>
          </div>
        );
      });
    }
  };
  console.log(data);
  return (
    <div className="w-full flex flex-col gap-10">
      <SectionHeader title="Заявки на вступление в подразделение" />
      <div className="grid mobile:grid-cols-1 notebook:grid-cols-2 gap-10">
        <GetInvites />
      </div>
    </div>
  );
};

export default InvitesPage;
