import Image from "next/image";
import blood_drop from "../../../assets/logo/icon.png";

const SpinLoader = () => {
  return (
    <div className="h-[80vh] flex justify-center items-center">
      <div className="relative w-20 h-20">
        {/* Outer spinning ring (faster clockwise) */}
        <div className="absolute inset-0 border-4 border-transparent border-t-blue-400 rounded-full animate-[spin_0.7s_linear_infinite]" />

        {/* Inner spinning ring (faster counter-clockwise) */}
        <div className="absolute inset-2 border-4 border-transparent border-t-red-400 rounded-full animate-[spin_0.8s_linear_reverse_infinite]" />

        {/* Center fixed icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Image src={blood_drop} width={50} height={50} alt="icon" priority />
        </div>
      </div>
    </div>
  );
};

export default SpinLoader;
