import { Atom } from "react-loading-indicators";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <Atom color="#474947" size="medium" text="" textColor="" />
    </div>
  );
}
