import type { IconType } from "react-icons"
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaMedium,
  FaXTwitter,
} from "react-icons/fa6"
import { BsWikipedia } from "react-icons/bs"
import { TbBrandNextjs } from "react-icons/tb"
import { RiReactjsFill, RiVercelFill } from "react-icons/ri"
import { Drop, Paperclip2Newicons } from "reicon-react"
import { CgNpm } from "react-icons/cg"
import { IoLogoGithub } from "react-icons/io5"
import { FiChrome } from "react-icons/fi"

type IconMatcher = {
  keywords: string[]
  icon: IconType
}

const DEFAULT_ICONS: IconMatcher[] = [
  {
    keywords: ["medium", "medium.com"],
    icon: FaMedium,
  },
  {
    keywords: ["localhost"],
    icon: FiChrome,
  },
  {
    keywords: ["npm", "npmjs.org"],
    icon: CgNpm,
  },
  {
    keywords: ["github", "github.com", "gist.github.com"],
    icon: IoLogoGithub,
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

  return match?.icon ?? Paperclip2Newicons
}
