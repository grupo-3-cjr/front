import { Upload } from "lucide-react";

type UploadFieldProps = {
    label: string;
}

export default function UploadField({ label }: UploadFieldProps) {
  return (
    <form action="" method="POST" className="flex flex-col items-center items-center gap-2 border-dashed border-2 border-[#6A38F3] rounded-lg p-4 w-96 h-32">
      <Upload
        size={36}
        className="text-[#6A38F3]"
      />
      <label>{label}</label>
      <input type="file" className="hidden"></input>
    </form>
  );
}