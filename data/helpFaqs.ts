export type HelpFaqCategory =
  | "getting-started"
  | "contributions"
  | "payouts"
  | "wallet"
  | "troubleshooting";

export interface HelpFaqItem {
  id: string;
  question: string;
  answer: string;
  category: HelpFaqCategory;
}

/**
 * Source of truth for the help centre entries.
 *
 * The list is rendered by the help page and is also the input for the
 * `FAQPage` JSON-LD (see `lib/seo/jsonLd.ts`), so both stay in sync.
 */
export const HELP_FAQS: HelpFaqItem[] = [
  // Getting Started
  {
    id: "gs-1",
    category: "getting-started",
    question: "What is Ahjoor?",
    answer:
      "Ahjoor is a blockchain-powered savings app that lets you save money together with friends, family, or community members using savings circles. Instead of trusting a middleman, smart contracts automate contributions, payouts, and ensure transparency for everyone in the circle.",
  },
  {
    id: "gs-2",
    category: "getting-started",
    question: "How do I get started?",
    answer:
      "Download the app, connect your wallet (Argent X or Braavos), and you're ready to go! You can either create a new circle or join an existing one. Just set the contribution amount, duration, and number of members, and the smart contract handles the rest.",
  },
  {
    id: "gs-3",
    category: "getting-started",
    question: "Do I need crypto experience?",
    answer:
      "No! While Ahjoor uses blockchain technology, we've designed it to be as simple as possible. You can use stablecoins (like USDT or USDC) which don't fluctuate in value, making it feel like using regular money.",
  },
  {
    id: "gs-4",
    category: "getting-started",
    question: "Which wallets are supported?",
    answer:
      "Currently, we support Argent X and Braavos wallets on Starknet. Both are free to download and easy to set up. We're working on expanding wallet support soon.",
  },
  {
    id: "gs-5",
    category: "getting-started",
    question: "Is Ahjoor safe to use?",
    answer:
      "Yes! All circles are managed by audited smart contracts. Your funds are never held by Ahjoor—they're controlled by code, not centralized servers. Everything is transparent and verifiable on-chain.",
  },

  // Contributions
  {
    id: "c-1",
    category: "contributions",
    question: "What is a contribution?",
    answer:
      "A contribution is your periodic payment into the circle. Every member contributes the same amount on a set schedule. Once all members have contributed in a round, the total pool is paid out to one member (determined by the rotation order).",
  },
  {
    id: "c-2",
    category: "contributions",
    question: "How often do I need to contribute?",
    answer:
      "The contribution frequency depends on how your circle is set up. It could be weekly, biweekly, or monthly. The frequency is decided when the circle is created and applies to all members equally.",
  },
  {
    id: "c-3",
    category: "contributions",
    question: "What happens if I miss a contribution?",
    answer:
      "Missing a contribution can have consequences set by the circle organizer. Typically, you'll be flagged as non-compliant or excluded from future payouts. The smart contract enforces these rules automatically to protect the circle.",
  },
  {
    id: "c-4",
    category: "contributions",
    question: "Can I change the contribution amount?",
    answer:
      "No, the contribution amount is fixed when the circle is created and cannot be changed mid-cycle. This ensures fairness and predictability for all members. You can propose a new circle with a different amount if needed.",
  },
  {
    id: "c-5",
    category: "contributions",
    question: "What currencies can we contribute in?",
    answer:
      "Ahjoor supports stablecoins like USDT, USDC, and other blockchain-based assets on Starknet. Using stablecoins means your savings won't lose value due to crypto volatility.",
  },

  // Payouts
  {
    id: "p-1",
    category: "payouts",
    question: "How are payouts decided?",
    answer:
      "Payouts follow a rotation order set when the circle is created. Each round, a different member receives the full pool of contributions from all members. This continues until everyone has received their turn.",
  },
  {
    id: "p-2",
    category: "payouts",
    question: "When do I receive my payout?",
    answer:
      "You receive your payout when it's your turn in the rotation and all members have contributed for that round. The smart contract automatically distributes the funds to your wallet on your payout date.",
  },
  {
    id: "p-3",
    category: "payouts",
    question: "What if someone doesn't contribute before my payout?",
    answer:
      "If a member hasn't contributed by the payout date, the smart contract will pause or adjust the payout based on the circle's rules. You can always check the circle details to see who is behind on payments.",
  },
  {
    id: "p-4",
    category: "payouts",
    question: "Can I claim my payout early?",
    answer:
      "No, payouts happen automatically on the scheduled date. This ensures fairness and prevents early withdrawals that could disrupt other members' turns. The fixed schedule is a core feature of savings circles.",
  },
  {
    id: "p-5",
    category: "payouts",
    question: "What are transaction fees?",
    answer:
      "Payouts involve blockchain transactions, which incur minimal network fees (gas fees). These are deducted from your payout and depend on network congestion. Ahjoor doesn't take a cut—fees go directly to the blockchain network.",
  },

  // Wallet
  {
    id: "w-1",
    category: "wallet",
    question: "What is a blockchain wallet?",
    answer:
      "A blockchain wallet is like a digital bank account that you control. It stores your cryptographic keys (your 'password') and lets you send and receive funds on the blockchain. You're in complete control—no bank or company can access your funds.",
  },
  {
    id: "w-2",
    category: "wallet",
    question: "How do I set up a wallet?",
    answer:
      "Download Argent X or Braavos from their official websites, follow the setup steps (you'll get a seed phrase to back up), and you're done! Your wallet will be connected to Starknet, and you can start using Ahjoor.",
  },
  {
    id: "w-3",
    category: "wallet",
    question: "What if I lose my seed phrase?",
    answer:
      "Your seed phrase is the only way to recover your wallet if you lose access. Store it securely (write it down, use a password manager, etc.). If you lose it, there's no way to recover your funds. Never share your seed phrase with anyone.",
  },
  {
    id: "w-4",
    category: "wallet",
    question: "How do I get stablecoins for contributions?",
    answer:
      "You can buy stablecoins like USDT or USDC on any cryptocurrency exchange (Binance, Coinbase, etc.) and transfer them to your Ahjoor wallet. Some exchanges also support direct transfers to Starknet for lower fees.",
  },
  {
    id: "w-5",
    category: "wallet",
    question: "Can I disconnect and reconnect my wallet?",
    answer:
      "Yes! You can disconnect your wallet anytime from the Wallet page. Your transaction history and circle memberships remain on-chain. Reconnect anytime with the same wallet address to resume activity.",
  },

  // Troubleshooting
  {
    id: "t-1",
    category: "troubleshooting",
    question: "Why is my contribution pending?",
    answer:
      "Blockchain transactions take time to confirm (usually 1-5 minutes). Your contribution will show as 'pending' until it's confirmed on the network. You can check its status by clicking the transaction hash to view it on the block explorer.",
  },
  {
    id: "t-2",
    category: "troubleshooting",
    question: "My payout didn't arrive. What do I do?",
    answer:
      "First, check the block explorer using the transaction hash from your wallet page. If it shows 'confirmed,' the funds should arrive in your wallet soon. If it shows 'failed,' contact support or check if there's an issue with the circle.",
  },
  {
    id: "t-3",
    category: "troubleshooting",
    question: "I'm getting an error when trying to contribute.",
    answer:
      "This could be due to insufficient balance, network issues, or wallet problems. Make sure you have enough stablecoins in your wallet to cover the contribution plus gas fees. Try disconnecting and reconnecting your wallet, or try again in a few minutes.",
  },
  {
    id: "t-4",
    category: "troubleshooting",
    question: "What if there's a dispute in my circle?",
    answer:
      "Ahjoor has a dispute resolution system for serious issues. Report the issue through the app's report feature and provide details. Our team will investigate and help resolve conflicts according to the circle's rules.",
  },
  {
    id: "t-5",
    category: "troubleshooting",
    question: "Can I leave a circle?",
    answer:
      "You cannot leave a circle mid-cycle as it would disrupt the rotation and fairness for other members. You can choose not to join future circles, but you must complete your current commitment.",
  },
];

export const HELP_FAQ_CATEGORIES: Record<HelpFaqCategory, string> = {
  "getting-started": "Getting Started",
  contributions: "Contributions",
  payouts: "Payouts",
  wallet: "Wallet",
  troubleshooting: "Troubleshooting",
};
