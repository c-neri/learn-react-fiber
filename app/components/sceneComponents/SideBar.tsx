import { Scroll } from "@react-three/drei";

export default function SideBar({
  onGenerate,
  steps,
}: {
  onGenerate: () => void;
  steps: {
    step1: number;
    step2: number;
    step3: number;
  };
}) {
  return (
    <Scroll html>
      <div
        style={{
          opacity: steps.step1,
        }}
        className={`h-screen flex items-end p-4`}
      >
        <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text border border-purple-500 font-semibold text-3d p-8 rounded-lg shadow-lg bg-gray-800 text-2xl">
          Hit the Cards!
        </div>
      </div>
      <div
        style={{
          opacity: steps.step2,
        }}
        className={`h-screen flex items-center p-4`}
      >
        <div
          className={`bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text border border-purple-500 font-semibold text-3d p-8 rounded-lg shadow-lg bg-gray-800 text-2xl cursor-pointer`}
          onClick={onGenerate}
        >
          Make Him Angry!
        </div>
      </div>
      <div
        style={{
          opacity: steps.step3,
        }}
        className={`h-screen flex items-end p-4`}
      >
        <div
          className={`bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text border border-purple-500 font-semibold text-3d p-8 rounded-lg shadow-lg bg-gray-800 text-2xl`}
        >
          Completed!
        </div>
      </div>
    </Scroll>
  );
}
