# Ticket Bounty

Ticket Bounty is a full-stack ticket management application built with Next.js.

Users can browse available tickets, create and manage their own tickets, set bounties and deadlines, update ticket status, and collaborate through comments. Authenticated users also have access to profile and password management.

## Features

- User authentication with protected routes and sessions
- Create, view, update, and delete tickets
- Ticket statuses: Open, In Progress, and Done
- Ticket comments with infinite scrolling
- Server-side authentication and authorization
- Form validation and user-friendly feedback
- Responsive

## Tech Stack

- **Next.js 16**
- **TypeScript**
- **React 19**
- **Prisma** — Database ORM
- **PostgreSQL / Supabase** — Database
- **TanStack Query**
- **React Hook Form + Zod**
- \*\*shadcn/ui
- **Tailwind CSS**
- **Lucide React**

## Environment Variables

The project uses a `.env` file for database configuration.

Required variables:

```env
DATABASE_URL="your-database-connection-url"
DIRECT_URL="your-direct-database-connection-url"
```
