"use client";

import { Button, Card, Divider, Typography } from "antd";

const { Title } = Typography;

export default function Hero() {
  return (
    <main className="bg-white">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:py-14" id="hero">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
          <div className="flex flex-col gap-5">
            <p className="text-sm sm:text-base">
              Built for farmers, organomists, workers and vendors
            </p>
            <p className="max-w-2xl text-3xl font-extrabold sm:text-4xl lg:text-5xl">
              A smarter coffee platform for
              <span className="text-secondary block"> farming guidance,</span>
              jobs, and local product discovery.
            </p>
            <p className="max-w-2xl text-base sm:text-lg lg:text-xl">
              Your trusted digital companion for coffee cultivation in Nepal.
              Connect with experts, identify diseases, find workers, and
              discover local coffee products - all in one place.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button>Explore Platform</Button>
              <Button>Learn More</Button>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <div className="text-center">
                <h2 className="text-2xl font-semibold">100+</h2>
                <p className="text-sm sm:text-base">Farmers Joined</p>
              </div>

              <Divider
                orientation="vertical"
                style={{ height: "50px", borderColor: "#7cb305" }}
                className="hidden sm:block"
              />

              <div className="text-center">
                <h2 className="text-2xl font-semibold">150+</h2>
                <p className="text-sm sm:text-base">Jobs Posted</p>
              </div>

              <Divider
                orientation="vertical"
                style={{ height: "50px", borderColor: "#7cb305" }}
                className="hidden sm:block"
              />

              <div className="text-center">
                <h2 className="text-2xl font-semibold">50+</h2>
                <p className="text-sm sm:text-base">Expert Blogs</p>
              </div>
            </div>
          </div>

          <Card size="medium" className="w-full lg:max-w-md">
            <div>
              <Title level={4}>
                Everything farmers need, in one calm and simple experience.
              </Title>
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}
