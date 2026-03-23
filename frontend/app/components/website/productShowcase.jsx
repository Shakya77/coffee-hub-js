// FeaturedCoffeeProducts.jsx
import React from "react";
import { Tabs, Card, Button, Space, Typography } from "antd";
import { ShoppingCartOutlined, ArrowRightOutlined } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

const products = [
  {
    key: "1",
    name: "Espresso Dark Roast",
    description:
      "Bold and intense dark roast perfect for espresso. Sourced from organic farms in Palpa district.",
    image: "/images/coffee-beans-bowl.jpg", // replace with real paths or URLs
    category: "beans",
  },
  {
    key: "2",
    name: "Coffee Grinder",
    description:
      "Grinder perfect for small-batch fresh grinding. Durable cast iron body.",
    image: "/images/coffee-grinder.jpg",
    category: "tools",
  },
  {
    key: "3",
    name: "Roasted Beans",
    description:
      "Hand-roasted single origin beans from the highlands of Gulmi. Medium roast with notes of chocolate and citrus.",
    image: "/images/roasted-coffee-beans.jpg",
    category: "beans",
  },
  {
    key: "4",
    name: "Green Coffee Beans",
    description:
      "Unroasted specialty-grade green beans. Perfect for home roasting or wholesale buyers. 1kg pack.",
    image: "/images/green-coffee-cherries.jpg",
    category: "beans",
  },
];

export default function ProductShowcase() {
  const items = [
    {
      key: "all",
      label: "All Products",
      children: <ProductGrid products={products} />,
    },
    {
      key: "beans",
      label: "Coffee Beans",
      children: (
        <ProductGrid
          products={products.filter((p) => p.category === "beans")}
        />
      ),
    },
    {
      key: "tools",
      label: "Tools",
      children: (
        <ProductGrid
          products={products.filter((p) => p.category === "tools")}
        />
      ),
    },
  ];

  return (
    <div
      style={{
        padding: "64px 24px",
        background: "linear-gradient(to bottom, #f9fafb, #ffffff)",
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Text
            strong
            style={{
              background: "#fef3c7",
              color: "#92400e",
              padding: "6px 16px",
              borderRadius: 9999,
              fontSize: 14,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Featured Products
          </Text>

          <Title level={2} style={{ margin: "16px 0 8px", color: "#111827" }}>
            Discover Local{" "}
            <span style={{ color: "#15803d" }}>Coffee Products</span>
          </Title>

          <Text
            type="secondary"
            style={{
              fontSize: 18,
              maxWidth: 700,
              display: "block",
              margin: "0 auto",
            }}
          >
            Explore Finished Coffee Products and Farming Tools From Verified
            Nepali Vendors.
          </Text>
        </div>

        {/* Tabs */}
        <Tabs
          centered
          items={items}
          size="large" // makes tabs reasonably sized (not huge)
          tabBarStyle={{ marginBottom: 40 }}
          destroyOnHidden // optional: better performance
        />

        {/* View All Button */}
        <div style={{ textAlign: "center", marginTop: 56 }}>
          <Button
            type="primary"
            size="large" // slightly bigger for CTA, but still standard
            icon={<ArrowRightOutlined />}
            style={{
              height: 40,
              fontSize: 14,
              background: "#15803d",
              borderColor: "#15803d",
            }}
          >
            View All Products
          </Button>
        </div>
      </div>
    </div>
  );
}

function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {products.map((product) => (
        <Card
          key={product.key}
          hoverable
          cover={
            <div style={{ height: 220, overflow: "hidden" }}>
              <img
                alt={product.name}
                src={product.image}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.4s",
                }}
                className="hover:scale-105"
              />
            </div>
          }
          styles={{ padding: 20 }}
          style={{ borderRadius: 12, border: "1px solid #e5e7eb" }}
        >
          <Title level={4} style={{ margin: "0 0 12px" }}>
            {product.name}
          </Title>

          <Paragraph
            type="secondary"
            style={{ marginBottom: 24, minHeight: 60 }}
          >
            {product.description}
          </Paragraph>

          <Button
            type="primary"
            icon={<ShoppingCartOutlined />}
            block
            style={{
              background: "#15803d",
              borderColor: "#15803d",
              height: 38,
              fontWeight: 500,
            }}
          >
            Buy Now
          </Button>
        </Card>
      ))}
    </div>
  );
}
