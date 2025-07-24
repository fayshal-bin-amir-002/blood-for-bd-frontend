import SpinLoader from "@/components/shared/Loaders/SpinLoader";

const Loader = () => {
  return (
    <div className="h-[80vh] flex justify-center items-center">
      <SpinLoader />
    </div>
  );
};

export default Loader;
