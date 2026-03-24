"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";
import { Drawer, Empty, Input, Tag } from "antd";

// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Selection } from "@tiptap/extensions";

// --- UI Primitives ---
import { Button } from "@/components/tiptap-ui-primitive/button";
import { Spacer } from "@/components/tiptap-ui-primitive/spacer";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/tiptap-ui-primitive/toolbar";

// --- Tiptap Node ---
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node/image-upload-node-extension";
import { HorizontalRule } from "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension";
import "@/components/tiptap-node/blockquote-node/blockquote-node.scss";
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-node/heading-node/heading-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";

// --- Tiptap UI ---
import { HeadingDropdownMenu } from "@/components/tiptap-ui/heading-dropdown-menu";
import { ImageUploadButton } from "@/components/tiptap-ui/image-upload-button";
import { ListDropdownMenu } from "@/components/tiptap-ui/list-dropdown-menu";
import { BlockquoteButton } from "@/components/tiptap-ui/blockquote-button";
import { CodeBlockButton } from "@/components/tiptap-ui/code-block-button";
import {
  ColorHighlightPopover,
  ColorHighlightPopoverContent,
  ColorHighlightPopoverButton,
} from "@/components/tiptap-ui/color-highlight-popover";
import {
  LinkPopover,
  LinkContent,
  LinkButton,
} from "@/components/tiptap-ui/link-popover";
import { MarkButton } from "@/components/tiptap-ui/mark-button";
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button";
import { UndoRedoButton } from "@/components/tiptap-ui/undo-redo-button";

// --- Icons ---
import { ArrowLeftIcon } from "@/components/tiptap-icons/arrow-left-icon";
import { HighlighterIcon } from "@/components/tiptap-icons/highlighter-icon";
import { LinkIcon } from "@/components/tiptap-icons/link-icon";

// --- Hooks ---
import { useIsBreakpoint } from "@/hooks/use-is-breakpoint";
import { useWindowSize } from "@/hooks/use-window-size";
import { useCursorVisibility } from "@/hooks/use-cursor-visibility";

// --- Components ---
import { ThemeToggle } from "@/components/tiptap-templates/simple/theme-toggle";

// --- Lib ---
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils";

// --- Styles ---
import "@/components/tiptap-templates/simple/simple-editor.scss";

import content from "@/components/tiptap-templates/simple/data/content.json";
import jargonDictionary from "@/components/tiptap-templates/simple/data/jargon-dictionary.json";

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildJargonAnchor(text, href, withTrailingSpace = false) {
  const anchor = `<a target="_blank" rel="noopener noreferrer nofollow" href="${href}"><span class="selection">${text}</span></a>`;
  return withTrailingSpace ? `${anchor} ` : anchor;
}

function detectJargonTerms(editorText) {
  if (!editorText) return [];

  const normalizedText = editorText.toLowerCase();

  return jargonDictionary.filter((entry) => {
    const pattern = new RegExp(
      `\\b${escapeRegex(entry.term.toLowerCase())}\\b`,
      "i",
    );
    return pattern.test(normalizedText);
  });
}

const MainToolbarContent = ({ onHighlighterClick, onLinkClick, isMobile }) => {
  return (
    <>
      <Spacer />
      <ToolbarGroup>
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
        <HeadingDropdownMenu modal={false} levels={[1, 2, 3, 4]} />
        <ListDropdownMenu
          modal={false}
          types={["bulletList", "orderedList", "taskList"]}
        />
        <BlockquoteButton />
        <CodeBlockButton />
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="strike" />
        <MarkButton type="code" />
        <MarkButton type="underline" />
        {!isMobile ? (
          <ColorHighlightPopover />
        ) : (
          <ColorHighlightPopoverButton onClick={onHighlighterClick} />
        )}
        {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
        <MarkButton type="superscript" />
        <MarkButton type="subscript" />
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
        <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="right" />
        <TextAlignButton align="justify" />
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
        <ImageUploadButton text="Add" />
      </ToolbarGroup>
      <Spacer />
      {isMobile && <ToolbarSeparator />}
      <ToolbarGroup>
        <ThemeToggle />
      </ToolbarGroup>
    </>
  );
};

const MobileToolbarContent = ({ type, onBack }) => (
  <>
    <ToolbarGroup>
      <Button variant="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === "highlighter" ? (
          <HighlighterIcon className="tiptap-button-icon" />
        ) : (
          <LinkIcon className="tiptap-button-icon" />
        )}
      </Button>
    </ToolbarGroup>

    <ToolbarSeparator />

    {type === "highlighter" ? (
      <ColorHighlightPopoverContent />
    ) : (
      <LinkContent />
    )}
  </>
);

export function SimpleEditor() {
  const isMobile = useIsBreakpoint();
  const { height } = useWindowSize();
  const [mobileView, setMobileView] = useState("main");
  const [isDictionaryOpen, setIsDictionaryOpen] = useState(false);
  const [detectedJargons, setDetectedJargons] = useState([]);
  const [jargonSearch, setJargonSearch] = useState("");
  const [copiedTerm, setCopiedTerm] = useState("");
  const toolbarRef = useRef(null);

  const normalizedSearch = jargonSearch.trim().toLowerCase();
  const visibleJargons = jargonDictionary.filter((entry) => {
    if (!normalizedSearch) return true;

    return (
      entry.term.toLowerCase().includes(normalizedSearch) ||
      entry.meaning.toLowerCase().includes(normalizedSearch)
    );
  });

  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
        class: "simple-editor",
      },
    },
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
        link: {
          openOnClick: false,
          enableClickSelection: true,
        },
      }),
      HorizontalRule,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,
      Selection,
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error) => console.error("Upload failed:", error),
      }),
    ],
    content,
  });

  const rect = useCursorVisibility({
    editor,
    overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0,
  });

  const syncJargonDictionary = useCallback(() => {
    if (!editor) return;

    const matchedJargons = detectJargonTerms(editor.getText());
    setDetectedJargons(matchedJargons);
  }, [editor]);

  const copyJargonMarkup = useCallback(async (jargon) => {
    const htmlSnippet = buildJargonAnchor(jargon.term, jargon.href, true);
    const plainTextSnippet = `${jargon.term} (${jargon.href})`;

    try {
      if (navigator.clipboard && typeof ClipboardItem !== "undefined") {
        const htmlBlob = new Blob([htmlSnippet], { type: "text/html" });
        const textBlob = new Blob([plainTextSnippet], { type: "text/plain" });
        await navigator.clipboard.write([
          new ClipboardItem({
            "text/html": htmlBlob,
            "text/plain": textBlob,
          }),
        ]);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(htmlSnippet);
      }

      setCopiedTerm(jargon.term);
      setTimeout(() => setCopiedTerm(""), 1800);
    } catch (error) {
      console.error("Failed to copy jargon markup:", error);
    }
  }, []);

  const insertJargonMarkup = useCallback(
    (jargon) => {
      if (!editor) return;

      const { from, to } = editor.state.selection;
      const selectedText = editor.state.doc.textBetween(from, to, " ");
      const displayText = selectedText || jargon.term;

      editor
        .chain()
        .focus()
        .insertContent(buildJargonAnchor(displayText, jargon.href, true))
        .unsetMark("link")
        .run();
    },
    [editor],
  );

  useEffect(() => {
    if (!isMobile && mobileView !== "main") {
      setMobileView("main");
    }
  }, [isMobile, mobileView]);

  useEffect(() => {
    if (!editor) return;

    syncJargonDictionary();
    editor.on("update", syncJargonDictionary);

    return () => {
      editor.off("update", syncJargonDictionary);
    };
  }, [editor, syncJargonDictionary]);

  return (
    <div className="simple-editor-wrapper">
      <EditorContext.Provider value={{ editor }}>
        <Toolbar
          ref={toolbarRef}
          style={{
            ...(isMobile
              ? {
                  bottom: `calc(100% - ${height - rect.y}px)`,
                }
              : {}),
          }}
        >
          {mobileView === "main" ? (
            <MainToolbarContent
              onHighlighterClick={() => setMobileView("highlighter")}
              onLinkClick={() => setMobileView("link")}
              isMobile={isMobile}
            />
          ) : (
            <MobileToolbarContent
              type={mobileView === "highlighter" ? "highlighter" : "link"}
              onBack={() => setMobileView("main")}
            />
          )}
        </Toolbar>

        <EditorContent
          editor={editor}
          role="presentation"
          className="simple-editor-content"
        />

        <button
          type="button"
          className="jargon-dictionary-trigger"
          onClick={() => setIsDictionaryOpen(true)}
        >
          Open Dictionary{" "}
          {detectedJargons.length > 0 ? `(${detectedJargons.length})` : ""}
        </button>

        <Drawer
          title="Jargon Dictionary"
          placement="right"
          size={380}
          open={isDictionaryOpen}
          onClose={() => setIsDictionaryOpen(false)}
        >
          <div className="jargon-drawer-content">
            <Input
              allowClear
              size="large"
              placeholder="Search jargon or meaning..."
              value={jargonSearch}
              onChange={(event) => setJargonSearch(event.target.value)}
            />

            {visibleJargons.length === 0 ? (
              <Empty description="No jargon found for this search" />
            ) : (
              visibleJargons.map((jargon) => (
                <div key={jargon.term} className="jargon-card">
                  <div className="jargon-card-header">
                    <div className="jargon-term-wrap">
                      <strong>{jargon.term}</strong>
                      {detectedJargons.some(
                        (item) => item.term === jargon.term,
                      ) ? (
                        <Tag color="blue">Detected</Tag>
                      ) : null}
                    </div>
                    <a
                      href={jargon.href}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                    >
                      Source
                    </a>
                  </div>

                  <p>{jargon.meaning}</p>

                  <div className="jargon-actions">
                    <button
                      type="button"
                      onClick={() => copyJargonMarkup(jargon)}
                    >
                      {copiedTerm === jargon.term
                        ? "Copied"
                        : "Copy Link Snippet"}
                    </button>
                    <button
                      type="button"
                      onClick={() => insertJargonMarkup(jargon)}
                    >
                      Insert as Link
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </Drawer>
      </EditorContext.Provider>
    </div>
  );
}
