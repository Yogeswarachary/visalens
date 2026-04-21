# VisaLens AI Copilot

Hi there! I'm excited to introduce you to VisaLens, my AI-powered visa guidance system that I built to help people navigate the complex world of international visa applications.

## What I Created

VisaLens is a smart web application that acts as your personal immigration attorney and visa compliance expert. I designed it to provide accurate, up-to-date advice for visa applications across multiple countries, with special focus on 2026 requirements and fee structures.

## Key Features I Built

### 🤖 AI-Powered Guidance
- Real-time visa advice using **Groq Compound Agentic models** for live 2026 regulatory search.
- Country-specific routing to official application portals
- Live currency exchange rates for accurate fee calculations

### 📋 Smart Document Management
- Upload and analyze your visa documents
- Get personalized compliance checklists
- Download official document requirements from government sites

### 💰 Fee Transparency
- Current visa application fees in both USD and INR
- Real-time exchange rate calculations
- 2026 fee structure updates

### 📥 Easy Exports
- Download your personalized visa guidance as PDF
- Direct links to official government websites
- One-click access to embassy/consulate portals

## How I Built It

### Tech Stack
- **Frontend**: Next.js 16 with React 19 and TypeScript
- **Styling**: Tailwind CSS with custom components
- **AI**: Groq SDK for natural language processing
- **PDF Generation**: jsPDF and html2canvas
- **UI Components**: Radix UI and custom shadcn components

### Architecture
- Server-side API routes for AI processing
- Client-side PDF generation
- Responsive design for all devices
- Real-time data fetching for exchange rates

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Groq API key (get one at groq.com)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/visalens.git
   cd visalens
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Visit `http://localhost:3000` to start using VisaLens!

## How to Use VisaLens

1. **Select Your Visa Type**: Choose from 50+ visa categories including US, UK, Canada, Schengen, and more
2. **Ask Your Question**: Type your specific visa query (e.g., "Do I need a visa for Germany?")
3. **Upload Documents** (optional): Add your passport, photos, or other documents for analysis
4. **Get AI Response**: Receive detailed guidance with official links and fee breakdowns
5. **Download Resources**: Export your guidance as PDF or visit official sites directly

## Supported Countries & Visa Types

- **United States**: F1, H1B, B1/B2, L1 visas
- **United Kingdom**: Student, Work, Tourist visas
- **Canada**: Study, Work, Tourist permits
- **Schengen Area**: Germany, France, Italy, Spain, Austria
- **Asia-Pacific**: Australia, New Zealand, Japan, South Korea
- **Middle East**: UAE, Turkey
- **And many more...**

## What Makes VisaLens Special

### For Users
- **Accurate Information**: Real-time data from official government sources
- **Cost Transparency**: Exact fees in your local currency
- **Time-Saving**: One-stop solution for all visa requirements
- **User-Friendly**: Simple interface, no complex forms

### For HR Departments
- **Compliance Ready**: Ensures employee visa compliance
- **Cost Management**: Accurate budget planning for visa expenses
- **Risk Reduction**: Minimizes visa application errors
- **Scalable**: Handles multiple employees' visa needs

## API Integration

VisaLens integrates with:
- **Groq AI**: For intelligent visa guidance
- **ExchangeRate-API**: For live currency conversion
- **Official Government Portals**: Direct links to embassies and consulates

## Future Enhancements I'm Planning

- Multi-language support
- Integration with embassy appointment systems
- Automated document verification
- Visa status tracking
- Mobile app version

## Contributing

I'm always open to feedback and improvements! If you have suggestions or find issues, please create an issue on GitHub.

## License

This project is built with ❤️ using open-source technologies. Feel free to use it for your visa needs!

---

**Built by**: Modepalli Yogeswarachary 
**Date**: April 2026  
**Version**: 1.0.0  
**Powered by**: Groq Compound
