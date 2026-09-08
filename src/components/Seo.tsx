import { Helmet } from "react-helmet-async";
import { absoluteUrl, breadcrumbSchema, seoConfig, type Crumb } from "@/config/site";

interface SeoProps {
  title: string;
  description: string;
  /** Site-relative path, e.g. "/services/road-construction". */
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedAt?: string;
  updatedAt?: string;
  noindex?: boolean;
  breadcrumbs?: Crumb[];
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const Seo = ({
  title,
  description,
  path,
  image,
  type = "website",
  publishedAt,
  updatedAt,
  noindex = false,
  breadcrumbs,
  jsonLd,
}: SeoProps) => {
  const url = absoluteUrl(path);
  const ogImage = absoluteUrl(image ?? seoConfig.defaultImage);
  const graphs = [
    ...(breadcrumbs && breadcrumbs.length > 1 ? [breadcrumbSchema(breadcrumbs)] : []),
    ...(jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []),
  ];

  return (
    <Helmet>
      <html lang={seoConfig.language} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta
        name="robots"
        content={noindex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1"}
      />

      <meta property="og:site_name" content={seoConfig.siteName} />
      <meta property="og:locale" content={seoConfig.locale} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={ogImage} />
      {publishedAt && <meta property="article:published_time" content={publishedAt} />}
      {updatedAt && <meta property="article:modified_time" content={updatedAt} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {graphs.map((g, i) => (
        <script type="application/ld+json" key={i}>
          {JSON.stringify(g)}
        </script>
      ))}
    </Helmet>
  );
};

export default Seo;
