import type { Metadata } from "next";
import LegalPage, { Section } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — Apex Talent Group",
  description: "How Apex Talent Group collects, uses and protects information.",
};

const EMAIL = "imam@apextalentgrp.com";

export default function Privacy() {
  return (
    <LegalPage eyebrow="Legal" title="Privacy Policy" updated="22 September 2026">
      <Section title="Who we are">
        <p>
          Apex Talent Group (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is an influencer marketing agency and a trading name of Influsync PTY LTD,
          registered in Australia. We connect brands with content creators for sponsored campaigns. This policy covers our website
          apextalentgrp.com and our internal creator research tool, Apex Creator Research.
        </p>
        <p>Questions about this policy can be sent to <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
      </Section>

      <Section title="Information we collect">
        <p><strong className="text-paper">From our website.</strong> If you contact us or apply as a creator, we collect what you submit: your name, email address, channel or company details and your message.</p>
        <p>
          <strong className="text-paper">From public creator profiles.</strong> To evaluate creators for brand campaigns, Apex Creator Research reads publicly
          available information about professional (business or creator) Instagram accounts and public YouTube channels. Using the Instagram
          Graph API, this is limited to an account&rsquo;s username, follower count, number of posts, and the like counts, comment counts,
          dates and types of its recent public posts. We do not access private accounts, direct messages, stories, personal contact details
          or any non-public data.
        </p>
        <p>
          <strong className="text-paper">From accounts we manage.</strong> Apex Creator Research signs in only with Facebook Pages and Instagram accounts
          owned by Apex Talent Group. It is used by our own team and is not offered to the public.
        </p>
      </Section>

      <Section title="How we use it">
        <ul>
          <li>To reply to enquiries and manage creator applications.</li>
          <li>To assess whether a creator&rsquo;s audience size and engagement suit a brand&rsquo;s campaign, and to present that creator to the brand.</li>
          <li>To contact creators and brands about specific sponsorship opportunities.</li>
        </ul>
        <p>We do not sell personal information, use it for advertising targeting, or share Instagram or Facebook data with data brokers.</p>
      </Section>

      <Section title="Sharing">
        <p>
          We share a creator&rsquo;s public audience metrics with a brand only when proposing that creator for a campaign. We use a small number of
          service providers to run our business, including Google Workspace (email and spreadsheets), Vercel (website hosting) and Instantly
          (email delivery). They process information on our behalf and are not permitted to use it for their own purposes.
        </p>
      </Section>

      <Section title="Retention">
        <p>
          We keep creator metrics only while they are useful for evaluating current or upcoming campaigns, and review them at least every
          12 months. Enquiry and application details are kept for as long as needed to respond and manage any resulting partnership.
          Data obtained through Meta&rsquo;s APIs is deleted on request or when it is no longer needed, whichever comes first.
        </p>
      </Section>

      <Section title="Your choices and deletion">
        <p>
          You can ask us what information we hold about you, ask us to correct it, or ask us to delete it. See our{" "}
          <a href="/data-deletion">data deletion instructions</a>, or email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. We respond within 30 days.
        </p>
      </Section>

      <Section title="Security">
        <p>
          Access to our data is limited to our team, protected by account passwords and two-step verification, and stored with reputable
          cloud providers. No method of storage is perfectly secure, but we take reasonable steps to protect the information we hold.
        </p>
      </Section>

      <Section title="Changes">
        <p>We may update this policy as our services change. The date at the top shows when it was last revised.</p>
      </Section>

      <Section title="Contact">
        <p>
          Influsync PTY LTD, trading as Apex Talent Group, Australia. Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. If you are not satisfied with our
          response, you may contact the Office of the Australian Information Commissioner.
        </p>
      </Section>
    </LegalPage>
  );
}
