import { GraduationCap } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center ">
      <div className="relative">
        {/* Glowing background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-75 animate-pulse"></div>
        {/* Icon container */}
        <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-lg animate-bounce">
          <GraduationCap className="h-8 w-8 text-white" />
        </div>
      </div>
    </div>
  );
}
