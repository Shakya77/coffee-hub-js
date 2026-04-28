"use client";

import { useEffect, useState } from "react";
import { Form, Input, message, Row, Col } from "antd";

import { SimpleEditor } from "../tiptap-templates/simple/simple-editor";

export function AgronomistBlogPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [editorContent, setEditorContent] = useState("");

  useEffect(() => {
    const root = document.documentElement;
    const hadDarkClass = root.classList.contains("dark");

    root.classList.remove("dark");

    return () => {
      if (hadDarkClass) {
        root.classList.add("dark");
      }
    };
  }, []);

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
          <SimpleEditor showThemeToggle={false} />
        </Col>
      </Row>
    </div>
  );
}
