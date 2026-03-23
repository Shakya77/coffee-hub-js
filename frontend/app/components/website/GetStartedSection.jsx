"use client";

import React from "react";
import { Button } from "antd";
import { PhoneOutlined } from "@ant-design/icons";

export default function GetStartedSection() {
  return (
    <section className="relative overflow-hidden bg-[#3E6B46] py-20 text-center">
      {/* Background circles */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-200 h-200 border border-white/10 rounded-full"></div>
        <div className="absolute w-150 h-150 border border-white/10 rounded-full"></div>
        <div className="absolute w-100 h-100 border border-white/10 rounded-full"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-4">
        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
          Ready to Transform <br />
          Your Coffee Farm?
        </h2>

        {/* Subtitle */}
        <p className="mt-4 text-white/80 text-sm md:text-base">
          Join hundreds of Nepali coffee farmers already using Coffee Info Hub.
          It's free to start.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="large"
            className="bg-white text-[#3E6B46] font-medium px-6 py-5 rounded-md border-none "
          >
            Get Started
          </Button>

          <Button
            size="large"
            icon={<PhoneOutlined />}
            className=" text-white font-medium px-6 py-5 rounded-md border-none "
          >
            Contact Us Now
          </Button>
        </div>
      </div>
    </section>
  );
}
