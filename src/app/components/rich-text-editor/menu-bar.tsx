import React from 'react'
import {
  Heading1, Heading2, Heading3, Heading4,
  Bold, Italic, Code, Redo, Undo, Strikethrough,
  Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered
} from 'lucide-react'
import { Toggle } from '@/components/ui/toggle'
import { Editor } from '@tiptap/react'

export default function MenuBar({ editor }: { editor: Editor | null }) {
  if (!editor) return null

  const options = [
    { icon: <Heading1 className="size-4" />, onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), pressed: editor.isActive('heading', { level: 1 }) },
    { icon: <Heading2 className="size-4" />, onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), pressed: editor.isActive('heading', { level: 2 }) },
    { icon: <Heading3 className="size-4" />, onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), pressed: editor.isActive('heading', { level: 3 }) },
    { icon: <Heading4 className="size-4" />, onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(), pressed: editor.isActive('heading', { level: 4 }) },
    { icon: <Bold className="size-4" />, onClick: () => editor.chain().focus().toggleBold().run(), pressed: editor.isActive('bold') },
    { icon: <Italic className="size-4" />, onClick: () => editor.chain().focus().toggleItalic().run(), pressed: editor.isActive('italic') },
    { icon: <Strikethrough className="size-4" />, onClick: () => editor.chain().focus().toggleStrike().run(), pressed: editor.isActive('strike') },
    { icon: <Code className="size-4" />, onClick: () => editor.chain().focus().toggleCode().run(), pressed: editor.isActive('code') },
    { icon: <List className="size-4" />, onClick: () => editor.chain().focus().toggleBulletList().run(), pressed: editor.isActive('bulletList') },
    { icon: <ListOrdered className="size-4" />, onClick: () => editor.chain().focus().toggleOrderedList().run(), pressed: editor.isActive('orderedList') },
    { icon: <Underline className="size-4" />, onClick: () => editor.chain().focus().toggleUnderline().run(), pressed: editor.isActive('underline') },
    { icon: <AlignLeft className="size-4" />, onClick: () => editor.chain().focus().setTextAlign('left').run(), pressed: editor.isActive({ textAlign: 'left' }) },
    { icon: <AlignCenter className="size-4" />, onClick: () => editor.chain().focus().setTextAlign('center').run(), pressed: editor.isActive({ textAlign: 'center' }) },
    { icon: <AlignRight className="size-4" />, onClick: () => editor.chain().focus().setTextAlign('right').run(), pressed: editor.isActive({ textAlign: 'right' }) },
    { icon: <AlignJustify className="size-4" />, onClick: () => editor.chain().focus().setTextAlign('justify').run(), pressed: editor.isActive({ textAlign: 'justify' }) },
    { icon: <Undo className="size-4" />, onClick: () => editor.chain().focus().undo().run(), pressed: false },
    { icon: <Redo className="size-4" />, onClick: () => editor.chain().focus().redo().run(), pressed: false },
  ]

  return (
    <div className="border rounded-md bg-slate-50 px-2 py-2 dark:bg-slate-800 flex flex-wrap gap-1">
      {options.map((option, index) => (
        <Toggle
          key={index}
          pressed={option.pressed}
          onPressedChange={option.onClick}
          className="p-2"
        >
          {option.icon}
        </Toggle>
      ))}
    </div>
  )
}
