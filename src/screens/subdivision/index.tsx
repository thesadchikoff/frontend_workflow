import AppLink from "../../components/ui/app-link";

const SubdivisionPage = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="p-10 flex flex-col items-center gap-5">
        <h1>Вы пока не состоите не в одном из подразделений</h1>
        <AppLink title="Посмотреть доступные" size="text-xs" />
      </div>
    </div>
  );
};

export default SubdivisionPage;