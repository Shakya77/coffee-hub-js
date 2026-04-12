"use client";

import { useState, useRef } from "react";
import { Form, Input, Button, message, Card, Row, Col } from "antd";
import { useCallback, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";

const { TextArea } = Input;

// Compact editor component for blog content
function BlogEditor({ onContentChange }) {
  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none focus:outline-none p-4",
      },
    },
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,
    ],
    content: "",
    onUpdate: ({ editor }) => {
      if (onContentChange) {
        onContentChange(editor.getHTML());
      }
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-moss/10 rounded-lg overflow-hidden">
      <EditorContent editor={editor} className="min-h-96 bg-white rounded-lg" />
    </div>
  );
}

export function AgronomistBlogPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [editorContent, setEditorContent] = useState("");

  const handleSubmit = async (values) => {
    // Validate editor content
    if (!editorContent || editorContent === "<p></p>") {
      message.error("Please write some content for your blog");
      return;
    }

    setLoading(true);
    try {
      const blogData = {
        id: Date.now(),
        title: values.title,
        description: values.description,
        content: editorContent,
        createdAt: new Date().toISOString(),
        author: "Agronomist",
      };

      // Store in localStorage for demo (frontend only)
      const existingBlogs = JSON.parse(
        localStorage.getItem("agronomistBlogs") || "[]",
      );
      existingBlogs.push(blogData);
      localStorage.setItem("agronomistBlogs", JSON.stringify(existingBlogs));

      message.success("Blog published successfully!");
      form.resetFields();
      setEditorContent("");
    } catch (error) {
      message.error("Failed to publish blog");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 text-3xl font-semibold text-forest">Write Blog</h1>
        <p className="max-w-2xl text-base text-moss">
          Share your agricultural knowledge and insights with farmers and other
          agronomists.
        </p>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card className="border border-moss/10 shadow-sm">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              className="space-y-6"
            >
              {/* Blog Title */}
              <Form.Item
                label="Blog Title"
                name="title"
                rules={[
                  { required: true, message: "Please enter blog title" },
                  { min: 5, message: "Title must be at least 5 characters" },
                ]}
              >
                <Input
                  placeholder="Enter blog title"
                  size="large"
                  className="rounded"
                />
              </Form.Item>

              {/* Blog Description */}
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  { required: true, message: "Please enter blog description" },
                  {
                    min: 20,
                    message: "Description must be at least 20 characters",
                  },
                ]}
              >
                <TextArea
                  placeholder="Brief description of your blog post"
                  rows={3}
                  maxLength={500}
                  showCount
                  className="rounded"
                />
              </Form.Item>

              {/* Rich Text Editor */}
              <Form.Item
                label="Content"
                required
                tooltip="Write the main content of your blog"
              >
                <BlogEditor
                  onContentChange={(content) => setEditorContent(content)}
                />
              </Form.Item>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  loading={loading}
                >
                  Publish Blog
                </Button>
                <Button
                  size="large"
                  onClick={() => {
                    form.resetFields();
                    setEditorContent("");
                  }}
                >
                  Reset
                </Button>
              </div>
            </Form>
          </Card>
        </Col>

        {/* Sidebar Info */}
        <Col xs={24} lg={8}>
          <Card
            title="Publishing Tips"
            className="border border-moss/10 shadow-sm"
          >
            <ul className="space-y-3 text-sm text-moss">
              <li>✓ Write clear and concise titles</li>
              <li>✓ Include relevant agricultural terms</li>
              <li>✓ Use formatting to make content readable</li>
              <li>✓ Review before publishing</li>
              <li>✓ Keep descriptions under 500 characters</li>
            </ul>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
