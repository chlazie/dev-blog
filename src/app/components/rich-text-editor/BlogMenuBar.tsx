"use client";

import React, { useState } from "react";
import { ImagePlus, Send } from "lucide-react";
import { Button } from "../../../app/components/ui/button";
import { toast } from "sonner";

export default function BlogMenuBar({
  onPublish,
  onImageUpload,
}: {
  onPublish: () => Promise<void>; // Make onPublish async
  onImageUpload: (file: File) => Promise<void>; // Make onImageUpload async
}) {
  const [uploading, setUploading] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Invalid file type', {
        description: 'Please select an image file (JPEG, PNG, GIF, etc.)'
      });
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File too large', {
        description: 'Please select an image smaller than 5MB'
      });
      return;
    }

    setUploading(true);
    
    const uploadToast = toast.loading('Uploading image...', {
      description: 'Please wait while we upload your image'
    });

    try {
      await onImageUpload(file);
      toast.success('Image uploaded successfully!', {
        description: 'Your image has been added to the editor',
        id: uploadToast
      });
    } catch (error) {
      toast.error('Upload failed', {
        description: 'Failed to upload image. Please try again.',
        id: uploadToast
      });
      console.error('Image upload error:', error);
    } finally {
      setUploading(false);
      // Reset the input
      e.target.value = '';
    }
  };

  const handlePublish = async () => {
    setPublishing(true);
    
    const publishToast = toast.loading('Publishing your article...', {
      description: 'This may take a moment'
    });

    try {
      await onPublish();
      toast.success('Article published successfully!', {
        description: 'Your article is now live on the blog',
        id: publishToast,
        duration: 5000,
        action: {
          label: 'View Blog',
          onClick: () => window.open('/blog', '_blank')
        }
      });
    } catch (error) {
      toast.error('Failed to publish', {
        description: 'There was an error publishing your article',
        id: publishToast
      });
      console.error('Publish error:', error);
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-between border-b px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-t-md">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => document.getElementById("image-upload")?.click()}
          disabled={uploading || publishing}
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
          onClick={handlePublish}
          disabled={publishing}
          className="bg-orange-500 hover:bg-orange-600 text-white disabled:bg-orange-400 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4 mr-1" />
          {publishing ? "Publishing..." : "Publish"}
        </Button>
      </div>
    </div>
  );
}