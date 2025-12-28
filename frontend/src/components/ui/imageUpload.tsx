import { Trash2, UploadCloud } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type ImageUploadProps = {
    onChange: (file: File | null) => void;
};

export function ImageUpload({ onChange }: ImageUploadProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleFile = (file: File | null) => {
        if (!file) {
            setPreview(null);
            onChange(null);
            return;
        }

        const url = URL.createObjectURL(file);
        setPreview(url);
        onChange(file);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) handleFile(file);
    };

    const handleRemove = () => {
        handleFile(null);
        if (inputRef.current) inputRef.current.value = "";
    };

    // cleanup object URL
    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    return (
        <div className="flex flex-col gap-2 mt-2">
            {!preview ? (
                <div
                    onClick={() => inputRef.current?.click()}
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    className="h-44 flex flex-col gap-3 items-center justify-center cursor-pointer
            bg-red-50 text-red-500 border border-dashed border-red-500
            rounded-md hover:bg-red-100 transition"
                >
                    <UploadCloud size={40} />
                    <p className="text-sm font-medium">
                        Drag & drop image or click to upload
                    </p>
                </div>
            ) : (
                <div className="relative h-44 border rounded-md overflow-hidden">
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-contain"
                    />
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-md"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            )}

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
            />
        </div>
    );
}