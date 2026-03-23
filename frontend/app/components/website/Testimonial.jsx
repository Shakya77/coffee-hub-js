"use client";

import React from "react";
import { Card, Rate, Avatar } from "antd";

const testimonials = [
  {
    name: "Kumar Bahadur",
    role: "Coffee Farmer, Gulmi",
    content:
      "The disease checker helped me save an entire batch of plants last monsoon. I learned it was leaf rust and applied the suggested copper fungicide in time.",
    initials: "KB",
  },
  {
    name: "Sita Kumari",
    role: "Coffee Farmer, Palpa",
    content:
      "I found 4 pickers within a day of posting a job. The platform made harvesting season so much smoother this year. Highly recommend for any Nepali farmer.",
    initials: "SK",
  },
  {
    name: "Rina Tamang",
    role: "Coffee Vendor, Kavre",
    content:
      "As a vendor, listing my products was easy. I've been getting WhatsApp messages from buyers across Nepal. Finally a platform that understands our needs.",
    initials: "RT",
  },
];

export default function Testimonial() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <div className="inline-block rounded-full bg-yellow-500/20 px-4 py-1 text-sm text-yellow-400 mb-4">
          BUILT FOR EVERYONE
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-12">
          What Farmers Say
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <Card key={index} className="rounded-xl shadow-md text-left">
              <Rate
                disabled
                defaultValue={5}
                className="text-yellow-500 text-sm"
              />

              {/* Content */}
              <p className="text-gray-600 mt-4 text-sm leading-relaxed">
                "{item.content}"
              </p>

              <div className="flex items-center gap-3 mt-6">
                <Avatar className="bg-green-700 text-white">
                  {item.initials}
                </Avatar>
                <div>
                  <p className="font-semibold text-gray-800">{item.name}</p>
                  <p className="text-xs text-orange-500">{item.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
