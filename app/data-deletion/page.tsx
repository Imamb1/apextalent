import type { Metadata } from "next";
import LegalPage, { Section } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Data Deletion — Apex Talent Group",
  description: "How to ask Apex Talent Group to delete information we hold about you.",
};

const EMAIL = "imam@apextalentgrp.com";

export default function DataDeletion() {
  return (
    <LegalPage eyebrow="Legal" title="Data Deletion Instructions" updated="22 September 2026">
      <Section title="What we may hold">
        <p>
          If you are a creator we have evaluated, we may hold public metrics about your professional Instagram account or YouTube channel,
          such as follower count, post count, and like and comment counts on recent public posts, along with any contact details you shared
          with us. Our research tool, Apex Creator Research, is used only by our own team. See our <a href="/privacy">Privacy Policy</a> for details.
        </p>
      </Section>

      <Section title="How to request deletion">
        <ul>
          <li>Email <a href={`mailto:${EMAIL}?subject=Data%20deletion%20request`}>{EMAIL}</a> with the subject &ldquo;Data deletion request&rdquo;.</li>
          <li>Include your Instagram username, YouTube channel link or the email address we contacted you on, so we can find your records.</li>
        </ul>
        <p>
          We will delete the information we hold about you, including any data obtained through the Instagram Graph API, within 30 days and
          confirm by email once it is done.
        </p>
      </Section>

      <Section title="If you used Facebook or Instagram login">
        <p>
          You can also remove the app&rsquo;s access at any time: on Facebook go to Settings &amp; privacy → Settings → Business integrations,
          find Apex Creator Research and choose Remove. Then email us as above and we will delete anything already collected.
        </p>
      </Section>
    </LegalPage>
  );
}
