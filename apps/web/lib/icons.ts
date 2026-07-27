import type { IconType } from "react-icons"
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6"
import { BsWikipedia } from "react-icons/bs"
import { TbBrandNextjs } from "react-icons/tb"
import {
  RiGithubLine,
  RiLink,
  RiMediumLine,
  RiNpmjsLine,
  RiReactjsFill,
  RiVercelFill,
} from "react-icons/ri"
import { Drop } from "reicon-react"

type IconMatcher = {
  keywords: string[]
  icon: IconType
}

const DEFAULT_ICONS: IconMatcher[] = [
  {
    keywords: ["medium", "medium.com"],
    icon: RiMediumLine,
  },
  {
    keywords: ["npm", "npmjs.org"],
    icon: RiNpmjsLine,
  },
  {
    keywords: ["github", "github.com", "gist.github.com"],
    icon: RiGithubLine,
  },
  {
    keywords: ["react"],
    icon: RiReactjsFill,
  },
  {
    keywords: ["packmd", "pack-md"],
    icon: Drop,
  },
  {
    keywords: ["facebook", "facebook.com"],
    icon: FaFacebook,
  },
  {
    keywords: ["instagram", "instagram.com"],
    icon: FaInstagram,
  },
  {
    keywords: ["linkedin", "linkedin.com"],
    icon: FaLinkedin,
  },
  {
    keywords: ["wikipedia", "wikipedia.org"],
    icon: BsWikipedia,
  },
  {
    keywords: ["twitter", "twitter.com", "x.com"],
    icon: FaXTwitter,
  },
  {
    keywords: ["vercel", "vercel.com", "vercel.app"],
    icon: RiVercelFill,
  },
  {
    keywords: ["next.js", "nextjs"],
    icon: TbBrandNextjs,
  },
]

export function resolveIcon(value: string): IconType {
  const input = value.toLowerCase()

  const match = [...DEFAULT_ICONS].find(({ keywords }) =>
    keywords.some((keyword) => input.includes(keyword.toLowerCase()))
  )

  return match?.icon ?? RiLink
}
