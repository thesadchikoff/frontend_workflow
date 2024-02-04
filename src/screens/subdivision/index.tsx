import Button from "../../components/button";
import { SetStateAction, useEffect, useState } from "react";
import subdivisionService from "../../services/subdivision/subdivision.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { constants } from "../../constants";

interface SubdivisionProps {
  subdivision: Subdivision;
  mutate?: () => void;
}

const SubdivisionPage = () => {
  const [isShowButton, setIsShowButton] = useState(true);
  async function getSubdivision() {
    setIsShowButton(false);
  }
  const Subdivisions = () => {
    const queryClient = useQueryClient();
    const { data, isLoading } = useQuery<Subdivision[]>({
      queryKey: [constants.queryKeys.SUBDIVISIONS],
      queryFn: subdivisionService.getSubdivisions,
    });
    const { mutate } = useMutation({
      mutationKey: [constants.queryKeys.SEND_INVITES],
      mutationFn: subdivisionService.getInviteToSubdivision,
      onSuccess() {
        queryClient.invalidateQueries({
          queryKey: [constants.queryKeys.SUBDIVISIONS],
        });
      },
    });
    if (isLoading) {
      return (
        <div>
          <span>Загрузка подразделений...</span>
        </div>
      );
    }
    if (data) {
      return (
        <div className="w-full">
          {data.map((subdivision) => {
            return (
              <SubdivisionItem
                subdivision={subdivision}
                mutate={() => mutate(subdivision)}
              />
            );
          })}
        </div>
      );
    }
    return (
      <div>
        <span>Подразделений пока нет</span>
      </div>
    );
  };
  const SubdivisionItem = ({ subdivision, mutate }: SubdivisionProps) => {
    return (
      <div className="w-full p-5 bg-[#0F1623] flex flex-col gap-4 rounded">
        <span className="text-lg font-bold">{subdivision.name}</span>
        <Button
          disable={subdivision.isinvited}
          title={subdivision.isinvited ? `Заявка уже подана` : `Подать заявку`}
          onClick={mutate}
        />
      </div>
    );
  };
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="p-10 flex flex-col items-center gap-5">
        <h1>Вы пока не состоите не в одном из подразделений</h1>
        {isShowButton ? (
          <Button title="Посмотреть доступные" onClick={getSubdivision} />
        ) : (
          <Subdivisions />
        )}
      </div>
    </div>
  );
};

export default SubdivisionPage;
