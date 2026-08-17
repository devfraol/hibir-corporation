import { Helmet } from "react-helmet-async";

interface SeoProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedAt?: string;
  jsonLd?: Record<string, unknown>;
}

const Seo = ({ title, description, path, image, type = "website", publishedAt, jsonLd }: SeoProps) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={path} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={path} />
    <meta property="og:type" content={type} />
    {image && <meta property="og:image" content={image} />}
    {publishedAt && <meta property="article:published_time" content={publishedAt} />}
    <meta name="twitter:card" content="summary_large_image" />
    {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
  </Helmet>
);

export default Seo;
