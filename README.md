# LiteMind Media - Business Automation Agency

This is the official website for LiteMind Media, a business automation agency that helps traditional businesses transition to fully automated online business models through our custom-built SaaS application, Business Auto Plus.

## Our Services

LiteMind Media specializes in:

- Business process automation
- Digital transformation consulting
- Custom SaaS implementation
- Business Auto Plus platform deployment

## Tech Stack

This project is built with:

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Deploy on Google Cloud

This project is currently deployed using Google Cloud free tier VMs. Here's how to deploy your Next.js app to Google Cloud:

1. **Build your application**:

   ```bash
   pnpm build
   ```

2. **Set up a Google Cloud VM Instance**:

   - Create a new VM instance in Google Cloud Console
   - Choose an e2-micro instance type (free tier eligible)
   - Select your preferred OS (Ubuntu recommended)

3. **Deploy your application**:

   - SSH into your VM instance
   - Clone your repository
   - Install dependencies: `pnpm install`
   - Build the app: `pnpm build`
   - Start the app: `pnpm start` or use PM2: `pm2 start pnpm --name "nextjs" -- start`

4. **Configure networking**:

   - Set up firewall rules to allow traffic on port 3000 (or your configured port)
   - Consider setting up NGINX as a reverse proxy for better performance

5. **Set up a domain (optional)**:
   - Configure your domain to point to your VM's IP address
   - Set up SSL with Let's Encrypt

Remember to monitor your usage to stay within the free tier limits.

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

Please make sure to update tests as appropriate.
