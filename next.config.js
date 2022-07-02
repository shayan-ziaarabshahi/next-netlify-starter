/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    "MONGODB_ATLAS_URI": "mongodb+srv://testUsername:testPassword@cluster0.37hqq.mongodb.net/next-amazon?retryWrites=true&w=majority",
    "PAYPAL_CLIENT_ID":"AfJ6Ws7w3Wga7qTJgvVlnFEYbMsyo9eUS6qJqgl5eQMWSAXo7M4QZjlnQbY-qSo9wdKSiD99a9SQ2D",
    "JWT_SECRET":"somePassword"
  },
}

module.exports = nextConfig
