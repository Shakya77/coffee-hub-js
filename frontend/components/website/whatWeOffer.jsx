"use client";

import { Card } from "antd";
import {
  BookOutlined,
  SearchOutlined,
  TeamOutlined,
  AppstoreOutlined,
  TranslationOutlined,
  HeartOutlined,
  RightOutlined,
} from "@ant-design/icons";

const features = [
  {
    icon: <BookOutlined />,
    title: "Expert Knowledge Hub",
    desc: "Access verified blogs, videos, and PDFs from agronomists. Learn best practices for cultivation, harvesting, and processing.",
    cta: "Read Blogs",
  },
  {
    icon: <SearchOutlined />,
    title: "Disease Identification",
    desc: "Input symptoms of your coffee plants and receive instant advisory on possible diseases with preventive suggestions.",
    cta: "Check Symptoms",
  },
  {
    icon: <TeamOutlined />,
    title: "Hire Farm Workers",
    desc: "Post short-term jobs for pruning, harvesting, or cutting. Workers can browse and apply for available tasks nearby.",
    cta: "Post a Job",
  },
  {
    icon: <AppstoreOutlined />,
    title: "Local Product Showcase",
    desc: "Discover finished coffee products and farming tools from Nepali vendors. Connect directly via WhatsApp.",
    cta: "Browse Products",
  },
  {
    icon: <TranslationOutlined />,
    title: "Farming Dictionary",
    desc: "Bilingual glossary of coffee farming terms. Easy-to-understand definitions crafted for every farmer.",
    cta: "Explore Terms",
  },
  {
    icon: <HeartOutlined />,
    title: "Growing Community",
    desc: "Join a network of farmers, agronomists, workers, and vendors all working together to uplift Nepali coffee.",
    cta: "Join Now",
  },
];

export default function WhatWeOffer() {
  return (
    <section id="what-we-offer" className="">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex justify-center mb-4">
          <span className="px-4 py-1 text-sm bg-green-100 text-green-700 rounded-full font-medium">
            WHAT WE OFFER
          </span>
        </div>

        <h2 className="text-4xl font-bold text-center text-forest leading-tight">
          Everything Your <br /> Coffee Farm Needs
        </h2>

        <p className="text-center text-gray-600 mt-4 max-w-2xl mx-auto">
          A Centralized Platform Built For Nepali Coffee Farmers – From
          Cultivation Guidance To Local Product Discovery.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {features.map((item, index) => (
            <Card
              key={index}
              variant="outlined"
              className="rounded-2xl bg-white/70 backdrop-blur-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              styles={{ padding: "18px" }}
            >
              <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-xl mb-4">
                {item.icon}
              </div>

              <h3 className="text-lg font-semibold text-forest mb-2">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {item.desc}
              </p>

              <div className="flex items-center gap-2 text-green-700 font-medium cursor-pointer hover:gap-3 transition-all">
                <span>{item.cta}</span>
                <RightOutlined />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
