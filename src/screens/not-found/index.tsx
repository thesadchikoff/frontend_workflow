import AppLink from "../../components/ui/app-link";

const NotFound = () => {
  return (
    <div className="w-full flex items-center h-full justify-center">
      <div className="p-10 flex flex-col gap-10 items-center">
        <h1 className="text-9xl font-black opacity-50">404</h1>
        <span>Похоже, что такой страницы не существует</span>
        <AppLink title="Вернуться на главную" to="/" size="text-xs" />
      </div>
    </div>
  );
};

export default NotFound;
