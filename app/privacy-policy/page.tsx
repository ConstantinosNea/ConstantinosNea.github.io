import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { LegalNotice } from "@/components/legal/LegalNotice";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${siteConfig.name}.`,
  alternates: { canonical: `${siteConfig.url}/privacy-policy` },
  robots: { index: false },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <h1 className="font-serif text-4xl font-semibold text-ink">Privacy Policy</h1>
      <p className="mt-3 text-sm text-ink-faint">Last updated: a placeholder date — update before launch.</p>

      <div className="mt-10">
        <LegalNotice />
      </div>

      <div className="article-body">
        <h2>What this policy covers</h2>
        <p>
          This Privacy Policy describes how {siteConfig.name} ("the site", "we", "I") collects, uses, and protects
          information from visitors. It applies to this website and the newsletter and contact form associated
          with it.
        </p>

        <h2>Information we collect</h2>
        <ul>
          <li>
            <strong>Newsletter subscribers:</strong> if the newsletter form is connected to an email provider, the
            email address you provide when subscribing is collected directly by that provider.
          </li>
          <li>
            <strong>Contact form:</strong> this site has no backend server. The contact form assembles your name,
            email, and message into a pre-filled email and opens it in your own email client — nothing is
            transmitted to or stored by this website itself.
          </li>
          <li>
            <strong>Usage data:</strong> standard, aggregated analytics data (such as pages visited and general
            location) may be collected if analytics tooling is enabled. No such tooling is active by default in
            this template.
          </li>
        </ul>

        <h2>How information is used</h2>
        <p>
          Email addresses collected via a connected newsletter provider are used solely to send occasional
          publication updates and can be unsubscribed from at any time. Contact form messages are sent, via your
          own email client, only to the site owner, for the sole purpose of responding to your enquiry.
          Information is not sold or shared with third parties for marketing purposes.
        </p>

        <h2>Third-party services</h2>
        <p>
          When connected to a newsletter provider (such as Buttondown, ConvertKit, or Mailchimp) or a form-email
          service (such as Resend or Postmark), those providers process data according to their own privacy
          policies. Links to their policies should be added here once a provider is selected.
        </p>

        <h2>Data retention</h2>
        <p>
          Newsletter subscriber data is retained until you unsubscribe. Contact form submissions are retained
          only as long as needed to address your enquiry, unless a longer retention period is required for
          legitimate business or legal reasons.
        </p>

        <h2>Your rights</h2>
        <p>
          Depending on your jurisdiction, you may have rights to access, correct, or delete your personal data.
          To exercise these rights, contact the email address listed on the <a href="/contact">Contact</a> page.
        </p>

        <h2>Cookies</h2>
        <p>
          See the <a href="/cookie-policy">Cookie Policy</a> for details on cookie use.
        </p>

        <h2>Changes to this policy</h2>
        <p>This policy may be updated periodically. Material changes will be reflected in the "last updated" date above.</p>
      </div>
    </div>
  );
}
