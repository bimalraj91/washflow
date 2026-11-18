import { buildMetadata, homeJsonLd, jsonLdString } from "@/lib/seo";
import { MotionController } from "@/components/ui/MotionController";
import { Hero } from "@/components/sections/Hero/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip/TrustStrip";
import { Problem } from "@/components/sections/Problem/Problem";
import { DashboardShowcase } from "@/components/sections/DashboardShowcase/DashboardShowcase";
import { WashManagement } from "@/components/sections/WashManagement/WashManagement";
import { FinancialManagement } from "@/components/sections/FinancialManagement/FinancialManagement";
import { CustomerManagement } from "@/components/sections/CustomerManagement/CustomerManagement";
import { EmployeeManagement } from "@/components/sections/EmployeeManagement/EmployeeManagement";
import { Analytics } from "@/components/sections/Analytics/Analytics";
import { MobileShowcase } from "@/components/sections/MobileShowcase/MobileShowcase";
import { PaymentDemo } from "@/components/sections/PaymentDemo/PaymentDemo";
import { Configuration } from "@/components/sections/Configuration/Configuration";
import { Benefits } from "@/components/sections/Benefits/Benefits";
import { Pricing } from "@/components/sections/Pricing/Pricing";
import { FAQ } from "@/components/sections/FAQ/FAQ";
import { CTA } from "@/components/sections/CTA/CTA";

export const metadata = buildMetadata({ path: "/" });

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(homeJsonLd()) }} />
      <Hero />
      <TrustStrip />
      <Problem />
      <DashboardShowcase />
      <WashManagement />
      <FinancialManagement />
      <CustomerManagement />
      <EmployeeManagement />
      <Analytics />
      <MobileShowcase />
      <PaymentDemo />
      <Configuration />
      <Benefits />
      <Pricing />
      <FAQ />
      <CTA />
      <MotionController />
    </>
  );
}
