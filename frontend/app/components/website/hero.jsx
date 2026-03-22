"use client";

import { Button, Card, Divider, Flex, Typography } from "antd";

const { Title } = Typography;

export default function Hero() {
  return (
    <main className="bg-white">
      <section className=" mx-auto max-w-7xl px-4 py-18" id="hero">
        <Flex gap={18}>
          <Flex direction="" gap={20} align="start" vertical>
            <p>Built for farmers, organomists, workers and vendors</p>
            <p className="text-5xl font-extrabold w-xl">
              A smarter coffee platform for
              <span className="text-secondary block"> farming guidance,</span>
              jobs, and local product discovery.
            </p>
            <p className="text-xl">
              Your trusted digital companion for coffee cultivation in Nepal.
              Connect with experts, identify diseases, find workers, and
              discover local coffee products - all in one place.
            </p>
            <Flex gap={8}>
              <Button>Explore Platform</Button>
              <Button>Learn More</Button>
            </Flex>

            <Flex align="center" justify="center" gap={8}>
              <div style={{ textAlign: "center" }}>
                <h2>100+</h2>
                <p>Farmers Joined</p>
              </div>

              <Divider
                orientation="vertical"
                style={{ height: "50px", borderColor: "#7cb305" }}
              />

              <div style={{ textAlign: "center" }}>
                <h2>150+</h2>
                <p>Jobs Posted</p>
              </div>

              <Divider
                orientation="vertical"
                style={{ height: "50px", borderColor: "#7cb305" }}
              />

              <div style={{ textAlign: "center" }}>
                <h2>50+</h2>
                <p>Expert Blogs</p>
              </div>
            </Flex>
          </Flex>

          <Card size="medium">
            <Flex>
              <Title level={4}>
                Everything farmers need, in one calm and simple experience.
              </Title>
            </Flex>
          </Card>
        </Flex>
      </section>
    </main>
  );
}
