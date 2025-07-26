import type { NextApiRequest, NextApiResponse } from "next";
import { DomainSuggestion, SearchDomainResponse } from "@/interfaces";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchDomainResponse | { error: string }>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { domain } = req.query;

  if (!domain || typeof domain !== "string") {
    return res.status(400).json({ error: "Domain parameter is required" });
  }

  const domainRegex = /^[a-zA-Z0-9-.]+$/;
  if (!domainRegex.test(domain) || domain.length < 2) {
    return res.status(400).json({ error: "Invalid domain format" });
  }

  try {
    const unavailableDomains = [
      "google.com",
      "linkedin.com",
      "github.com",
      "airbnb.com",
    ];

    const formattedSearchedDomain = domain.includes(".")
      ? domain
      : `${domain}.com`;

    const isAvailable = !unavailableDomains.includes(
      formattedSearchedDomain.toLowerCase()
    );

    const baseDomain = domain.includes(".") ? domain.split(".")[0] : domain;

    const suggestions: DomainSuggestion[] = [];

    if (isAvailable) {
      suggestions.push({
        name: formattedSearchedDomain,
        available: true,
        price: "12.99",
        renewal: "12.99",
      });
    }

    suggestions.push(
      {
        name: `${baseDomain}.me`,
        available: true,
        price: "15.79",
        renewal: "15.79",
      },
      {
        name: `${baseDomain}.org`,
        available: true,
        price: "7.50",
        renewal: "10.11",
      },
      {
        name: `${baseDomain}.tech`,
        available: true,
        price: "45.18",
        renewal: "45.18",
      },
      {
        name: `${baseDomain}.net`,
        available: true,
        price: "11.84",
        renewal: "11.84",
      },
      {
        name: `${baseDomain}.biz`,
        available: true,
        price: "15.18",
        renewal: "15.18",
      }
    );

    const response: SearchDomainResponse = {
      searchedDomain: formattedSearchedDomain,
      suggestions,
      isAvailable,
    };

    await new Promise((resolve) => setTimeout(resolve, 1000));

    res.status(200).json(response);
  } catch (error) {
    console.error("Error in search-domain API:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
