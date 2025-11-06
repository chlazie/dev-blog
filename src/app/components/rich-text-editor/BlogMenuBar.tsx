"use client";

import React, { useState } from "react";
import { ImagePlus, Upload, Send } from "lucide-react";
import { Button } from "../../../app/components/ui/button"

export default function BlogMenuBar({
  onPublish,
  onImageUpload,
}: {
  onPublish: () => void;
  onImageUpload: (file: File) => void;
}) {
  const [uploading, setUploading] = useState(false);

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    await onImageUpload(file);
    setUploading(false);
  };

  return (
    <div className="w-full flex items-center justify-between border-b px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-t-md">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => document.getElementById("image-upload")?.click()}
          disabled={uploading}
        >
          <ImagePlus className="w-4 h-4 mr-1" />
          {uploading ? "Uploading..." : "Upload Image"}
        </Button>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageSelect}
        />
      </div>

      <div className="flex items-center gap-2">
        <Button
          size="sm"
          onClick={onPublish}
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          <Send className="w-4 h-4 mr-1" />
          Publish
        </Button>
      </div>
    </div>
  );
}