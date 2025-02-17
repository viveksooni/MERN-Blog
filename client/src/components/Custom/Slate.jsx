import React, { useState, useMemo, useCallback } from "react";
import {
  createEditor,
  Editor,
  Transforms,
  Element as SlateElement,
} from "slate";
import { Slate, Editable, withReact, useSlate } from "slate-react";
import { Button } from "../ui/button";
import { Bold, Italic, List, Heading2, Quote } from "lucide-react";

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph." }],
  },
];

const ToolbarButton = ({ format, icon: Icon, ...props }) => {
  const editor = useSlate();
  return (
    <Button
      variant="ghost"
      size="sm"
      className={`p-2 ${isBlockActive(editor, format) ? "bg-muted" : ""}`}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
      {...props}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = format === "bulleted-list";

  Transforms.unwrapNodes(editor, {
    match: (n) => ["bulleted-list"].includes(n.type),
    split: true,
  });

  Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === format,
  });
  return !!match;
};

const Element = ({ attributes, children, element }) => {
  const style = { margin: "1em 0" };

  switch (element.type) {
    case "heading":
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case "quote":
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case "paragraph":
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
    case "bulleted-list":
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case "list-item":
      return <li {...attributes}>{children}</li>;
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

const SlateEditor = () => {
  const editor = useMemo(() => withReact(createEditor()), []);

  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem("content");
    return stored ? JSON.parse(stored) : initialValue;
  });

  const handleChange = useCallback((newValue) => {
    setValue(newValue);
    localStorage.setItem("content", JSON.stringify(newValue));
  }, []);

  const renderElement = useCallback((props) => <Element {...props} />, []);

  return (
    <div className="border rounded-lg overflow-hidden">
      <Slate editor={editor} initialValue={value} onChange={handleChange}>
        <div className="border-b p-2 bg-muted/50 flex gap-1">
          <ToolbarButton format="heading" icon={Heading2} />
          <ToolbarButton format="quote" icon={Quote} />
          <ToolbarButton format="bulleted-list" icon={List} />
        </div>
        <Editable
          className="p-4 min-h-[300px] focus:outline-none prose dark:prose-invert max-w-none"
          renderElement={renderElement}
          placeholder="Start writing your blog post..."
        />
      </Slate>
    </div>
  );
};

export default SlateEditor;
