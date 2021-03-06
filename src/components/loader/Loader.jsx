import { LoaderIcon } from "icons";

function Loader({ message = "Loading...", isLarge = false, isMedium = false }) {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center flex-wrap-reverse z-[100]">
      <LoaderIcon isMedium={isMedium} isLarge={isLarge} />
      <span className="font-medium text-xl">{message}</span>
    </div>
  );
}

export { Loader };
